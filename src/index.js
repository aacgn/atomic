// DOM manipulation

export function createAtom(config, tag, textContent = null) {
    const { className, style } = config;

    return {
        tag: tag,
        style: style,
        className: className,
        props: {
            textContent: textContent
        },
        dom: null
    }
}

export function mountAtom(atom, parentDOMNode) {
    const { tag, className, style, props } = atom;

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

    parentDOMNode.appendChild(domNode);

    return domNode;
}

export function createMolecule(config, atoms = null) {
    const { className, style } = config;

    return {
        style: style,
        className: className,
        props: {
            atoms: atoms
        },
        dom: null
    }
}

export function mountMolecule(molecule, parentDOMNode) {
    const { className, style, props } = molecule;

    const domNode = document.createElement('div');

    molecule.dom = domNode;
    
    if (props.atoms) {
        props.atoms.forEach(atom => mountAtom(atom, domNode));
    }
    
    if (className !== undefined) {
        domNode.className = className;
    }

    if (style !== undefined) {
        Object.keys(style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}

export function createOrganism(config, molecules = null) {
    const { name, className, style } = config;

    return {
        name: name,
        type: "internalSource",
        style: style,
        className: className,
        props: {
            molecules: molecules
        },
        dom: null
    }
}

export function mountOrganism(organism, parentDOMNode) {
    const { className, style, props } = organism;

    const domNode = document.createElement('div');

    organism.dom = domNode;
    
    if (props.molecules) {
        props.molecules.forEach(molecule => mountMolecule(molecule, domNode));
    }
    
    if (className !== undefined) {
        domNode.className = className;
    }

    if (style !== undefined) {
        Object.keys(style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}

export function createExternalOrganism(config) {
    const { className, style, sourceUrl } = config;

    return {
        type: "externalSource",
        style: style,
        className: className,
        sourceUrl: sourceUrl,
        dom: null
    }
}

export function mountExternalOrganism(externalOrganism, parentDOMNode) {
    const { className, style, sourceUrl } = externalOrganism;

    const domNode = document.createElement('iframe');

    domNode.sandbox.add('allow-same-origin');
    domNode.sandbox.add('allow-scripts');
    domNode.sandbox.add('allow-popups');
    domNode.sandbox.add('allow-forms');
    domNode.frameBorder = '0';
    
    externalOrganism.dom = domNode;
    
    if (className !== undefined) {
        domNode.className = className;
    }

    if (style !== undefined) {
        Object.keys(style).forEach((sKey) => domNode.style[sKey] = style[sKey]);
    }

    if (sourceUrl !== undefined) {
        domNode.onload = async () => {
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
        }
    }

    parentDOMNode.appendChild(domNode);

    return domNode;
}


export function createTemplate(config, organisms = null) {
    const { name, className, style } = config;

    return {
        name: name,
        style: style,
        className: className,
        props: {
            organisms: organisms
        },
        dom: null
    }
}

export function mountTemplate(template, parentDOMNode) {
    const { name, className, style, props } = template;

    const domNode = document.createElement('div');

    if (props.organisms) {
        props.organisms.forEach(organism => {
            switch(organism.type) {
                case "internalSource":
                    mountOrganism(organism, domNode);
                    break;
                case "externalSource":
                    mountExternalOrganism(organism, domNode);
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

    parentDOMNode.appendChild(domNode);

    return domNode;
}

// Store

const store = {};

// DOM Events

export function useMessageInterceptor() {
    window.addEventListener('message', (event) => {
        const data = event.data;
        if (data && data.hasAtomicSignature) {
            switch(data.event) {
                case "navigate":
                    navigateTo(data.data );
                    break;
                case "store":
                    store[data.store] = data.data;
                    break;
                default:
                    break;
            }
        }
    }, false);
}

// Router

function useWindowHashChangeInterceptor(routes, parentDOMNode) {
    window.addEventListener('hashchange', () => {
        mount(routes, parentDOMNode);
    });
}

function useWindowLoadInterceptor(routes, parentDOMNode) {
    window.addEventListener('load', () => {
        mount(routes, parentDOMNode);
    }); 
}

function navigateTo(path) {
    window.location.hash = path;
}

function currentPath() {
    const path = location.hash.slice(1).toLowerCase();
    return path ? path : '/';
}

function mount(routes, parentDOMNode) {
    const matchRoute = routes.find(r => r.path === currentPath());
    if (matchRoute) {
        const template = matchRoute.template;
        if (parentDOMNode)
            parentDOMNode.innerHTML = "";
            mountTemplate(template, parentDOMNode);
    }
}

// Boostrap

export function boostrap(routes, parentDOMNode) {
    useWindowHashChangeInterceptor(routes, parentDOMNode);
    useWindowLoadInterceptor(routes, parentDOMNode);
}