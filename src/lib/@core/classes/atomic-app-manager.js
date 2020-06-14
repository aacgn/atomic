import { AtomicAppRouter } from "./atomic-app-router";
import { Storage } from "../enums/app-storage.enum";

export class AtomicAppManager {
    constructor(storageData, appRouter) {
        this._storageData = storageData;
        this._appRouter = appRouter;

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
                        this._storageData[data.name] = data.data;
                        break;
                    default:
                        const customEvent = new CustomEvent(event.event, {
                            data: event.data
                        });
                        window.dispatchEvent(customEvent);
                        break;
                }
            }
        }, false);
    }

    useWindowGlobalVariables() {
        window[Storage.STORAGE_NAME] = this._storageData;
    }
}
