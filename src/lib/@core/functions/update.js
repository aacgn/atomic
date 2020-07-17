import {unmountVDOMElementTree, mountVDOMElements } from "./mount";

export function updateContext(ref, contextAttr, contextVal) {
    // Deep copy
    const initialContext = JSON.parse(JSON.stringify(ref.props.context));

    ref.props.context[contextAttr] = contextVal;

    if (initialContext !== ref.props.context) {
        unmountVDOMElementTree(ref.parentDOMNode, ref.childDOM);
        ref.childDOM = mountVDOMElements(ref.props.mount(), ref.parentDOMNode);
    }
}