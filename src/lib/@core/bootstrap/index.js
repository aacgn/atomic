import { AppManager } from "../app-manager/index";

export function boostrap(routes, parentDOMNode) {
    return new AppManager({}, routes, parentDOMNode);
}