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

export function createAtomElement(tag, attr, props) {

    const { children, ...filteredProps } = props;

    const vDOMElement = createVDOMElement(tag, attr, filteredProps);

    return {...vDOMElement,
        type: vDOMType.ATOM_ELEMENT
    }
}

export function createMoleculeElement(tag, attr, props) {
    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.MOLECULE_ELEMENT
    }
}

export function createOrganismElement(tag, attr, props) {
    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.ORGANISM_ELEMENT
    }
}

export function createTemplateElement(tag, attr, props) {
    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.TEMPLATE_ELEMENT
    }
}

export function createMicrofrontWrapperElement(attr, props) {

    const { src, href, ...filteredAttr } = attr;

    const { innerHTML, innerText, textContent, children, ...filteredProps } = props;

    const vDOMElement = createVDOMElement(null, filteredAttr, filteredProps);

    return {
        ...vDOMElement,
        type: vDOMType.MICROFRONT_WRAPPER_ELEMENT,
        props: {
            ...vDOMElement.props,
            baseUrl: props.baseUrl
        }
    }
}

export function createElement(tag, attr, props) {
    const vDOMElement = createVDOMElement(tag, attr, props);

    return {...vDOMElement,
        type: vDOMType.ELEMENT
    }
}

export function createPage(props) {
    const { mount, context, methods, onMount, onUnmount } = props;

    return {
        type: vDOMType.PAGE,
        props: {
            mount: mount,
            context: context,
            methods: methods,
            onMount: onMount,
            onUnmount: onUnmount
        },
        parentDOMNode: null
    }
}