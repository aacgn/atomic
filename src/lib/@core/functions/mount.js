import { vDOMType } from "../enums/v-dom-type.enum";
import { CustomWindowVariable } from "../enums/custom-window-variable.enum";
import { AtomicPrivateEvents } from "../enums/atomic-private-events";

function mountMicroFrontendWrapper(microFrontendWrapper, parentDOMNode) {
    const { attr, props } = microFrontendWrapper;

    const domNode = document.createElement("iframe");

    domNode.sandbox.add("allow-same-origin");
    domNode.sandbox.add("allow-scripts");
    domNode.sandbox.add("allow-popups");
    domNode.sandbox.add("allow-forms");
    domNode.frameBorder = "0";
    
    microFrontendWrapper.dom = domNode;

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

        window.postMessage({
            hasAtomicSignature: true,
            event: AtomicPrivateEvents.START_MICRO_FRONTEND_REQUEST
        }, "*");

        domNode.addEventListener("load", async () => {
            const contentWindow = domNode.contentWindow;
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
                if (contentWindow) {
                    Object.defineProperty(contentWindow, CustomWindowVariable.ATOMIC_CONTEXT_STORE, { value: window[CustomWindowVariable.ATOMIC_CONTEXT_STORE] });
                }
                if (contentDocument) {
                    contentDocument.write(containerHTMLDocument.documentElement.innerHTML);
                    contentDocument.close();
                }
            }

            window.postMessage({
                hasAtomicSignature: true,
                event: AtomicPrivateEvents.END_MICRO_FRONTEND_REQUEST
            }, "*");
            
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
                case vDOMType.MICRO_FRONTEND_WRAPPER:
                    mountMicroFrontendWrapper(child, domNode);
                    break;          
                case vDOMType.TEMPLATE:
                    if (type !== vDOMType.PAGE)
                        throw `${vDOMType.TEMPLATE} must be a child of ${vDOMType.PAGE}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.ORGANISM:
                    if (type !== vDOMType.TEMPLATE)
                        throw `${vDOMType.ORGANISM} must be a child of ${vDOMType.TEMPLATE}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.MOLECULE:
                    if (type !== vDOMType.ORGANISM)
                        throw  `${vDOMType.MOLECULE} must be a child of ${vDOMType.ORGANISM}.`;
                    mountVDOMElement(child, domNode);
                    break;
                case vDOMType.ATOM:
                    if (type !== vDOMType.MOLECULE)
                        throw  `${vDOMType.ATOM} must be a child of ${vDOMType.MOLECULE}.`;
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

export function unmountVDOMElementTree(parentDOMNode, childDOM) {
    parentDOMNode.removeChild(childDOM);
}

export function unmountTransitionPage(page, transitionPage) {
    page.childDOM.removeAttribute("display");
    unmountPage(transitionPage);
}

export function unmountPage(page) {
    if (page) {

        const { props } = page;

        if (props.onUnmount !== undefined) {
            props.onUnmount(page);
        }

        unmountVDOMElementTree(page.parentDOMNode, page.childDOM);

        page.childDOM = null;
        page.parentDOMNode = null;

        // Clear any openned javascript intervals
        for (var i = setTimeout(function() {}, 0); i > 0; i--) {
            window.clearInterval(i);
            window.clearTimeout(i);
            if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
        }
    }
}

export function mountVDOMElements(vDOMElementsTree, parentDOMNode) {
    if (vDOMElementsTree && parentDOMNode) {
        switch(vDOMElementsTree.type) {
            case vDOMType.MICRO_FRONTEND_WRAPPER:
                return mountMicroFrontendWrapper(vDOMElementsTree, parentDOMNode);
            default:
                return mountVDOMElement(vDOMElementsTree, parentDOMNode);
        }
    }
}

export function mountTransitionPage(page, transitionPage) {
    page.childDOM.setAttribute("display", "none");
    mountPage(transitionPage, page.parentDOMNode);
}

export function mountPage(page, parentDOMNode) {
    if (page && parentDOMNode) {

        const { type, props } = page;

        if (type !== vDOMType.PAGE)
            throw `Only a ${vDOMType.PAGE} can be passed through router.`;


        if (props.name !== undefined && props.context !== undefined)
            window[CustomWindowVariable.ATOMIC_CONTEXT_STORE][props.name] = props.context;

        if (props.mount !== undefined) {
            const vDOMElementsTree = props.mount();
            page.childDOM = mountVDOMElements(vDOMElementsTree, parentDOMNode);
        }

        if (props.onMount !== undefined) {
            props.onMount(page);
        }

        page.parentDOMNode = parentDOMNode;
    }
}