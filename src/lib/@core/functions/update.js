import {unmountContent, mountContent } from "./mount";

export function updateContext(ref, contextAttr, contextVal) {
    // Deep copy
    const initialContext = JSON.parse(JSON.stringify(ref.props.context));

    ref.props.context[contextAttr] = contextVal;

    if (initialContext !== ref.props.context) {
        unmountContent(ref.props.mount(), ref.dom);
        mountContent(ref.props.mount(), ref.dom);
    }
}