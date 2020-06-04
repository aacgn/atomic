import { vDOMType } from "../enums/v-dom-type.enum";

export function mountExternalSource(externalSource, parentDOMNode) {
    const { className, style, sourceUrl } = externalSource;

    const domNode = document.createElement('iframe');

    domNode.sandbox.add('allow-same-origin');
    domNode.sandbox.add('allow-scripts');
    domNode.sandbox.add('allow-popups');
    domNode.sandbox.add('allow-forms');
    domNode.frameBorder = '0';
    
    externalSource.dom = domNode;
    
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
                    Object.defineProperty(contentWindow, 'AtomicAppStore', { value: window.AtomicAppStore });
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

    const { type, tag, props, className, style, onClick } = internalSource;

    const domNode = document.createElement(tag);

    internalSource.dom = domNode;
    
    if (props.children) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, domNode);
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
                case vDOMType.ATOM:
                    if (type !== vDOMType.MOLECULE)
                        throw  `${vDOMType.ATOM} must be a child of ${vDOMType.MOLECULE}.`;
                    mountInternalSource(child, domNode);
                default:
                    break;
            }
        });
    }

    if (props.textContent) {
        domNode.textContent = props.textContent;
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

export function unmount(parentDOMNode) {
    parentDOMNode.innerHTML = "";
}

export function mount(page, parentDOMNode) {
    unmount(parentDOMNode);
    if (page) {
        const AtomicPage = page;
        const instance = new AtomicPage();
        const template = instance.template();
        if (template) {
            switch(template.type) {
                case vDOMType.TEMPLATE:
                    mountInternalSource(template, parentDOMNode);
                    break;
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(template, parentDOMNode);
                    break;
                default:
                    break;
            }
        }
    }
}