import { vDOMType } from "../enums/v-dom-type.enum";
import { Storage } from "../enums/app-storage.enum";
import { DOMTagType } from "../enums/dom-tag-type.enum";

export function mountExternalSource(externalSource, parentDOMNode) {
    const { id, className, style, sourceUrl } = externalSource;

    const domNode = document.createElement('iframe');

    domNode.sandbox.add('allow-same-origin');
    domNode.sandbox.add('allow-scripts');
    domNode.sandbox.add('allow-popups');
    domNode.sandbox.add('allow-forms');
    domNode.frameBorder = '0';
    
    externalSource.dom = domNode;

    if (id !== undefined) {
        domNode.id = id;
    }
    
    if (className !== undefined) {
        domNode.className = className;
    }

    if (style !== undefined) {
        Object.keys(style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    if (sourceUrl !== undefined) {
        domNode.addEventListener('load', async () => {
            const contentWindow = domNode.contentWindow;
            const contentDocument = domNode.contentDocument;
            const containerHTMLDocument = document.implementation.createHTMLDocument();
            const containerHTML = await fetch(sourceUrl, { mode: 'cors', referrerPolicy: 'origin-when-cross-origin'})
              .then( (response) => {
                return response.text();
              })
              .catch(() => {
                return
              });
        
            if (containerHTML) {
                containerHTMLDocument.documentElement.innerHTML = containerHTML;
                const containerBase = document.createElement('base');
                containerBase.href = sourceUrl;
                containerHTMLDocument.head.insertAdjacentElement('afterbegin', containerBase);
                if (contentWindow) {
                    Object.defineProperty(contentWindow, Storage.STORAGE_NAME, { value: window[Storage.STORAGE_NAME] });
                }
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

export function mountInternalSource(internalSource, parentDOMNode) {

    const { type, tag, props, id, className, style, onClick } = internalSource;

    const domNode = document.createElement(tag);

    internalSource.dom = domNode;

    if(tag === DOMTagType.IMG && props.src) {
        domNode.src = props.src;
    }

    if (tag === DOMTagType.A && props.href) {
        domNode.href = props.href
    }

    if (props.textContent) {
        domNode.textContent = props.textContent;
    }

    if (props.children) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, domNode);
                    break;
                case vDOMType.TEMPLATE:
                    if (type !== vDOMType.PAGE)
                        throw `${vDOMType.TEMPLATE} must be a child of ${vDOMType.PAGE}.`;
                    mountInternalSource(child, domNode);
                    break;
                case vDOMType.ORGANISM:
                    if (type !== vDOMType.TEMPLATE)
                        throw `${vDOMType.ORGANISM} must be a child of ${vDOMType.TEMPLATE}.`;
                    mountInternalSource(child, domNode);
                    break;
                case vDOMType.MOLECULE:
                    if (type !== vDOMType.ORGANISM)
                        throw  `${vDOMType.MOLECULE} must be a child of ${vDOMType.ORGANISM}.`;
                    mountInternalSource(child, domNode);
                    break;
                case vDOMType.ATOM:
                    if (type !== vDOMType.MOLECULE)
                        throw  `${vDOMType.ATOM} must be a child of ${vDOMType.MOLECULE}.`;
                    mountInternalSource(child, domNode);
                    break;
                default:
                    break;
            }
        });
    }

    if (id !== undefined) {
        domNode.id = id;
    }
    
    if (className !== undefined) {
        domNode.className = className;
    }

    if (style !== undefined) {
        Object.keys(style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    if (onClick !== undefined) {
        domNode.addEventListener('click', onClick);
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}

export function unmount(ref, parentDOMNode, calledFromRouter = false) {
    if (ref && parentDOMNode) {

        const { type, props } = ref;

        if (type !== vDOMType.PAGE)
            throw `Only ${vDOMType.PAGE} components are allowed to start mounting the application.`;

        parentDOMNode.innerHTML = "";

        if (calledFromRouter) {
            if (props.onUnmount !== undefined) {
                props.onUnmount(ref);
            }

            ref.dom = null;
        }
    }
}

export function mount(ref, parentDOMNode) {
    if (ref && parentDOMNode) {

        ref.dom = parentDOMNode;

        const { type, props } = ref;

        if (type !== vDOMType.PAGE)
            throw `Only ${vDOMType.PAGE} components are allowed to start mounting the application.`;

        window[Storage.STORAGE_NAME][props.name] = props.context;

        if (props.mount !== undefined) {
            const child = props.mount();

            switch(child.type) {
                case vDOMType.TEMPLATE:
                    mountInternalSource(child, parentDOMNode);
                    break;
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, parentDOMNode);
                    break;
                default:
                    throw `Only ${vDOMType.TEMPLATE} or ${vDOMType.EXTERNAL_SOURCE} components are allowed to be a child of ${vDOMType.PAGE} component.`;
            }
        }

        if (props.onMount !== undefined) {
            props.onMount(ref);
        }
    }
}