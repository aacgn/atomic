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


export function mountAtom(atom, parentDOMNode) {
    const { tag, className, style, onClick, props } = atom;

    const domNode = document.createElement(tag);

    atom.dom = domNode;

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

export function mountMolecule(molecule, parentDOMNode) {
    const { className, style, onClick, props } = molecule;

    const domNode = document.createElement('div');

    molecule.dom = domNode;
    
    if (props.children) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.ATOM:
                    mountAtom(child, domNode);
                    break;
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, domNode);
                    break;
                default:
                    break;
            }
        });
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

export function mountOrganism(organism, parentDOMNode) {
    const { className, style, onClick, props } = organism;

    const domNode = document.createElement('div');

    organism.dom = domNode;
    
    if (props.children) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.MOLECULE:
                    mountMolecule(child, domNode);
                    break;
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, domNode);
                    break;
                default:
                    break;
            }
        });
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

export function mountTemplate(template, parentDOMNode) {
    const { name, className, style, onClick, props } = template;

    const domNode = document.createElement('div');

    if (props.children) {
        props.children.forEach(child => {
            switch(child.type) {
                case vDOMType.ORGANISM:
                    mountOrganism(child, domNode);
                    break;
                case vDOMType.EXTERNAL_SOURCE:
                    mountExternalSource(child, domNode);
                    break;
                default:
                    break;
            }
        });
    }    

    template.dom = domNode;
    
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