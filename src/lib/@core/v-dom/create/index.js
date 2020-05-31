import { vDOMType } from "../enums/v-dom-type.enum";

export function createExternalSource(config) {
    const { className, style, sourceUrl } = config;

    return {
        type: vDOMType.EXTERNAL_SOURCE,
        style: style,
        className: className,
        sourceUrl: sourceUrl,
        dom: null
    }
}

export function createAtom(config, tag, textContent = null) {
    const { className, style, onClick } = config;

    return {
        type: vDOMType.ATOM,
        tag: tag,
        style: style,
        className: className,
        onClick: onClick,
        props: {
            textContent: textContent
        },
        dom: null
    }
}

export function createMolecule(config, children = null) {
    const { className, style, onClick } = config;

    return {
        type: vDOMType.MOLECULE,
        style: style,
        className: className,
        onClick: onClick,
        props: {
            children: children
        },
        dom: null
    }
}

export function createOrganism(config, children = null) {
    const { name, className, style, onClick } = config;

    return {
        type: vDOMType.ORGANISM,
        name: name,
        style: style,
        className: className,
        onClick: onClick,
        props: {
            children: children
        },
        dom: null
    }
}

export function createTemplate(config, children = null) {
    const { name, className, style, onClick } = config;

    return {
        type: vDOMType.TEMPLATE,
        name: name,
        style: style,
        className: className,
        onClick: onClick,
        props: {
            children: children
        },
        dom: null
    }
}