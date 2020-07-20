import { CustomWindowVariable } from "../enums/custom-window-variable.enum";
import { AtomicPublicEvents } from "../enums/atomic-public-events.enum";
import { AtomicPrivateEvents } from "../enums/atomic-private-events";

export class Atomic {
    constructor(router, parentDOMNode) {
        this._router = router;
        this._router.setParentDOMNode(parentDOMNode);

        this._atomicContextStore = {};

        this._handleMicrofrontRequest = 0;

        this._useMessageInterceptor();
        this._useWindowVariables();
    }

    _useMessageInterceptor() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data && data.hasAtomicSignature) {
                switch(data.event) {
                    case AtomicPublicEvents.NAVIGATE:
                        this._router.navigateTo(data.data);
                        break;
                    case AtomicPublicEvents.STORE:
                        if (data.data)
                            this._atomicContextStore[data.data.name] = data.data.data;
                        break;
                    case AtomicPublicEvents.CUSTOM_EVENT:
                        if (data.data) {
                            const customEvent = new CustomEvent(data.data.name, {
                                detail: data.data.data
                            });
                            window.dispatchEvent(customEvent);
                        }
                        break;
                    case AtomicPrivateEvents.START_MICRO_FRONTEND_REQUEST:
                        this._handleMicrofrontRequest += 1;
                        if (this._handleMicrofrontRequest > 0)
                            this._router.enableTransitionPage();
                        break;
                    case AtomicPrivateEvents.END_MICRO_FRONTEND_REQUEST:
                        this._handleMicrofrontRequest -= 1;
                        if (this._handleMicrofrontRequest === 0)
                            setTimeout(() => {
                                this._router.disableTransitionPage();
                            }, 1000);
                        break;
                    default:
                        break;
                }
            }
        }, false);
    }

    _useWindowVariables() {
        window[CustomWindowVariable.ATOMIC_CONTEXT_STORE] = this._atomicContextStore;
    }
}
