import { Router } from "../router/index";

export class AppManager {
    constructor(store, routes, parentDOMNode) {
        this._store = store;
        this._router = new Router(routes, parentDOMNode);

        this.useMessageInterceptor();
        this.useWindowGlobalVariables();
    }

    useMessageInterceptor() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data && data.hasAtomicSignature) {
                switch(data.event) {
                    case "navigate":
                        this._router.navigateTo(data.data );
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
        window.AppStore = this._store;
    }
}
