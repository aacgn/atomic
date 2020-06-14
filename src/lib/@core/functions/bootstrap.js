import { AtomicAppManager } from "../classes/atomic-app-manager";
import { AppRouterType } from "../enums/app-router-type.enum";
import { AtomicAppRouter } from "../classes/atomic-app-router";

export function bootstrap(routes, parentDOMNode, mode = AppRouterType.HISTORY) {
    return new AtomicAppManager({}, new AtomicAppRouter(routes, parentDOMNode, mode));
}