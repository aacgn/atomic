import { AtomicAppManager } from "../classes/atomic-app-manager";

export function boostrap(routes, parentDOMNode) {
    return new AtomicAppManager({}, routes, parentDOMNode);
}