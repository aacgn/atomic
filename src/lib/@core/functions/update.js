import { unmount, mount } from "./mount";

export function updateContext(ref, contextAttr, contextVal) {
    // Deep copy
    const initialContext = JSON.parse(JSON.stringify(ref.props.context));

    ref.props.context[contextAttr] = [contextVal];

    if (initialContext !== ref.props.context) {
        unmount(ref, ref.dom);
        mount(ref, ref.dom);
    }
}