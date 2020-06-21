import { vDOMType } from "../enums/v-dom-type.enum";

export function createExternalSource(config) {
    const { id, className, style, sourceUrl } = config;

    return {
        type: vDOMType.EXTERNAL_SOURCE,
        id: id,
        className: className,
        style: style,
        sourceUrl: sourceUrl,
        dom: null
    }
}

export function createInternalSource(config, tag, children = null) {
    const { id, className, style, src, alt, href, innerHTML, textContent, onClick} = config;

    return {
        type: vDOMType.INTERNAL_SOURCE,
        tag: tag,
        id: id,
        className: className,
        style: style,
        onClick: onClick,
        props: {
            src: src,
            alt: alt,
            href: href,
            innerHTML: innerHTML,
            textContent: textContent,
            children: children
        },
        dom: null
    }
}

export function createAtom(config, tag) {
    const internalSource = createInternalSource(config, tag, null);

    return {...internalSource,
        type: vDOMType.ATOM
    }
}

export function createMolecule(config, tag, children = null) {
    const internalSource = createInternalSource(config, tag, children);

    return {...internalSource,
        type: vDOMType.MOLECULE
    }
}

export function createOrganism(config, tag, children = null) {
    const internalSource = createInternalSource(config, tag, children);

    return {...internalSource,
        type: vDOMType.ORGANISM
    }
}

export function createTemplate(config, tag, children = null) {
    const internalSource = createInternalSource(config, tag, children);

    return {...internalSource,
        type: vDOMType.TEMPLATE
    }
}

export function createPage(config) {
    const { name, context, methods, mount, onMount, onUnmount } = config;

    if (name === undefined || context === undefined) {
        throw `name and context are mandatory object fields of the ${vDOMType.PAGE}`;
    }
    else if (typeof(name) !== "string") {
        throw `name field should be a string type`
    }
    else if ((typeof(context) !== "object")) {
        throw `context field should be a object type`
    }

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
        dom: null
    }
}