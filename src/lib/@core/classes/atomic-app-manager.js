import { AtomicAppRouter } from "./atomic-app-router";

export class AtomicAppManager {
    constructor(routes, parentDOMNode) {
        this._store = {};
        this._appRouter = new AtomicAppRouter(routes, parentDOMNode);

        this.useMessageInterceptor();
        this.useWindowGlobalVariables();
    }

    useMessageInterceptor() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data && data.hasAtomicSignature) {
                switch(data.event) {
                    case "navigate":
                        this._appRouter.navigateTo(data.data);
                        break;
                    case "store":
                        this._store[data.name] = data.data;
                        break;
                    default:
                        break;
                }
            }
        }, false);
    }

    useWindowGlobalVariables() {
        window.AtomicAppFreshStore = this._store;
    }
}
