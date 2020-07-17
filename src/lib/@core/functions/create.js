import { vDOMType } from "../enums/v-dom-type.enum";

function createVDOMElement(tag, attr, props) {
    const { 
        id, 
        className, 
        style, 
        src, 
        href, 
        alt
    } = attr;

    const {
        innerHTML, 
        innerText, 
        textContent, 
        eventListener,
        eventHandler,
        children
    } = props;

    return {
        tag: tag,
        attr: {
            id: id,
            className: className,
            style: style,
            src: src,
            href: href,
            alt: alt
        },
        props: {
            innerHTML: innerHTML,
            innerText: innerText,
            textContent: textContent,
            eventListener: eventListener,
            eventHandler: eventHandler,
            children: children
        },
        dom: null
    }
}

export function createAtom(config) {
    const { tag, attr, props } = config;

    const { children, ...filteredProps } = props;

    const vDOMElement = createVDOMElement(tag, attr, filteredProps);

    return {...vDOMElement,
        type: vDOMType.ATOM
    }
}

export function createMolecule(config) {
    const { tag, attr, props } = config;

    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.MOLECULE
    }
}

export function createOrganism(config) {
    const { tag, attr, props } = config;

    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.ORGANISM
    }
}

export function createTemplate(config) {
    const { tag, attr, props } = config;

    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.TEMPLATE
    }
}

export function createMicroFrontendWrapper(config) {
    const { attr, props } = config;

    const { src, href, ...filteredAttr } = attr;

    const { innerHTML, innerText, textContent, children, ...filteredProps } = props;

    const vDOMElement = createVDOMElement(null, filteredAttr, filteredProps);

    return {
        ...vDOMElement,
        type: vDOMType.MICRO_FRONTEND_WRAPPER,
        props: {
            ...vDOMElement.props,
            url: props.url
        }
    }
}

export function createPage(props) {
    const { name, context, methods, mount, onMount, onUnmount } = props;

    return {
        type: vDOMType.PAGE,
        props: {
            name: name,
            context: context,
            methods: methods,
            mount: mount,
            onMount: onMount,
            onUnmount: onUnmount
        },
        childDOM: null,
        parentDOMNode: null
    }
}