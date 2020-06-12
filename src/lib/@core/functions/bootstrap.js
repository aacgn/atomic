import { AtomicAppManager } from "../classes/atomic-app-manager";

export function bootstrap(routes, parentDOMNode) {
    return new AtomicAppManager(routes, parentDOMNode);
}