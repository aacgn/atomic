import { vDOMType } from "../enums/v-dom-type.enum";

export function createExternalSource(attr) {
    const { id, className, style, sourceUrl } = attr;

    return {
        type: vDOMType.EXTERNAL_SOURCE,
        id: id,
        className: className,
        style: style,
        sourceUrl: sourceUrl,
        dom: null
    }
}

function createInternalSource(attr, tag, children = null, textContent = null) {
    const { id, className, style, onClick} = attr;

    return {
        tag: tag,
        id: id,
        className: className,
        style: style,
        onClick: onClick,
        props: {
            textContent: textContent,
            children: children
        },
        dom: null
    }
}

export function createAtom(attr, tag, textContent = null) {
    const internalSource = createInternalSource(attr, tag, null, textContent);

    return {...internalSource,
        type: vDOMType.ATOM
    }
}

export function createMolecule(attr, tag, children = null, textContent = null) {
    const internalSource = createInternalSource(attr, tag, children, textContent);

    return {...internalSource,
        type: vDOMType.MOLECULE
    }
}

export function createOrganism(attr, tag, children = null, textContent = null) {
    const internalSource = createInternalSource(attr, tag, children, textContent);

    return {...internalSource,
        type: vDOMType.ORGANISM
    }
}

export function createTemplate(attr, tag, children = null, textContent = null) {
    const internalSource = createInternalSource(attr, tag, children, textContent);

    return {...internalSource,
        type: vDOMType.TEMPLATE
    }
}

export function createPage(config) {
    const { name, context, mount, onMount, onUnmount } = config;

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
            mount: mount,
            onMount: onMount,
            onUnmount: onUnmount
        },
        dom: null
    }
}