import { vDOMType } from "../enums/v-dom-type.enum";

function mountMicrofrontWrapper(microfrontWrapper, parentDOMNode) {
    const { attr, props } = microfrontWrapper;

    const domNode = document.createElement("iframe");

    domNode.sandbox.add("allow-same-origin");
    domNode.sandbox.add("allow-scripts");
    domNode.sandbox.add("allow-popups");
    domNode.sandbox.add("allow-forms");
    domNode.frameBorder = "0";
    
    microfrontWrapper.dom = domNode;

    if (attr.id !== undefined) {
        domNode.id = attr.id;
    }
    
    if (attr.className !== undefined) {
        domNode.className = attr.className;
    }

    if (attr.style !== undefined) {
        Object.keys(attr.style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    if (props.url !== undefined) {
        domNode.addEventListener("load", async () => {
            const contentDocument = domNode.contentDocument;
            const containerHTMLDocument = document.implementation.createHTMLDocument();
            const containerHTML = await fetch(props.url, { mode: "cors", referrerPolicy: "origin-when-cross-origin"})
              .then( (response) => {
                return response.text();
              })
              .catch(() => {
                return
              });
        
            if (containerHTML) {
                containerHTMLDocument.documentElement.innerHTML = containerHTML;
                const containerBase = document.createElement("base");
                containerBase.href = props.url;
                containerHTMLDocument.head.insertAdjacentElement("afterbegin", containerBase);
                if (contentDocument) {
                    contentDocument.write(containerHTMLDocument.documentElement.innerHTML);
                    contentDocument.close();
                }
            }
        }, { once: true });
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}

function mountVDOMElement(vDOMElement, parentDOMNode) {

    const { type, tag, attr, props } = vDOMElement;

    const domNode = document.createElement(tag);

    vDOMElement.dom = domNode;

    if (attr.id !== undefined) {
        domNode.id = attr.id;
    }
    
    if (attr.className !== undefined) {
        domNode.className = attr.className;
    }

    if (attr.style !== undefined) {
        Object.keys(attr.style).forEach((sKey) => domNode.style[sKey] = attr.style[sKey]);
    }

    if(attr.src !== undefined) {
        domNode.src = attr.src;
    }

    if (attr.href !== undefined) {
        domNode.href = props.href
    }

    if (props.innerHTML !== undefined) {
        domNode.innerHTML = props.innerHTML;
    }

    if (props.innerText !== undefined) {
        domNode.innerText = props.innerText;
    }

    if (props.textContent !== undefined) {
        domNode.textContent = props.textContent;
    }

    if (props.children !== undefined) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.MICROFRONT_WRAPPER_ELEMENT:
                    mountMicrofrontWrapper(child, domNode);
                    break;
                case vDOMType.ELEMENT:
                    if (type !== vDOMType.ELEMENT && type !== vDOMType.PAGE)
                        throw `${vDOMType.ELEMENT} must be a child of ${vDOMType.PAGE} or another ${vDOMType.ELEMENT}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.TEMPLATE_ELEMENT:
                    if (type !== vDOMType.PAGE)
                        throw `${vDOMType.TEMPLATE_ELEMENT} must be a child of ${vDOMType.PAGE}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.ORGANISM_ELEMENT:
                    if (type !== vDOMType.TEMPLATE_ELEMENT)
                        throw `${vDOMType.ORGANISM_ELEMENT} must be a child of ${vDOMType.TEMPLATE_ELEMENT}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.MOLECULE_ELEMENT:
                    if (type !== vDOMType.ORGANISM_ELEMENT)
                        throw  `${vDOMType.MOLECULE_ELEMENT} must be a child of ${vDOMType.ORGANISM_ELEMENT}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.ATOM_ELEMENT:
                    if (type !== vDOMType.MOLECULE_ELEMENT)
                        throw  `${vDOMType.ATOM_ELEMENT} must be a child of ${vDOMType.MOLECULE_ELEMENT}.`;
                    mountVDOMElement(child, domNode);
                    break;
                default:
                    break;
            }
        });
    }

    if (props.eventListener !== undefined && props.eventHandler !== undefined) {
        domNode.addEventListener(props.eventListener, props.eventHandler);
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}

export function unmountVDOMElementTree(parentDOMNode) {
    if (parentDOMNode) {
        parentDOMNode.innerHTML = "";
    }
}

export function unmountPage(page) {
    if (page) {

        const { props, parentDOMNode } = page;

        if (props.onUnmount !== undefined) {
            props.onUnmount(page);
        }

        parentDOMNode.innerHTML = "";

        page.parentDOMNode = null;
    }
}

export function mountVDOMElements(vDOMElementsTree, parentDOMNode) {
    if (vDOMElementsTree && parentDOMNode) {
        switch(vDOMElementsTree.type) {
            case vDOMType.ELEMENT:
            case vDOMType.TEMPLATE_ELEMENT:
                mountVDOMElement(vDOMElementsTree, parentDOMNode);
                break;
            case vDOMType.MICROFRONT_WRAPPER_ELEMENT:
                mountMicrofrontWrapper(vDOMElementsTree, parentDOMNode);
                break;
            default:
                throw `Only ${vDOMType.ELEMENT}, ${vDOMType.MICROFRONT_WRAPPER_ELEMENT} or ${vDOMType.TEMPLATE_ELEMENT} are allowed to be a child of a ${vDOMType.PAGE}.`;
        }
    }
}

export function mountPage(page, parentDOMNode) {
    if (page && parentDOMNode) {

        const { type, props } = page;

        if (type !== vDOMType.PAGE)
            throw `Only a ${vDOMType.PAGE} can be passed through router.`;

        if (props.mount !== undefined) {
            const vDOMElementsTree = props.mount();
            mountVDOMElements(vDOMElementsTree, parentDOMNode);
        }

        if (props.onMount !== undefined) {
            props.onMount(page);
        }

        page.parentDOMNode = parentDOMNode;
    }
}