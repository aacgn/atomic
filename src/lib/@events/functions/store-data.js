import { AtomicPublicEvents } from "../../@core/enums/atomic-public-events.enum";

export function storeData(name, data) {
    const navigateData = { 
        hasAtomicSignature: true,
        event: AtomicPublicEvents.STORE,
        data: {
            name: name,
            data: data
        }
    };

    window.postMessage(navigateData);
}