import { AtomicPublicEvents } from "../../@core/enums/atomic-public-events.enum";

export function navigateTo(path) {
    const navigateData = { 
        hasAtomicSignature: true,
        event: AtomicPublicEvents.NAVIGATE,
        data: path
    };

    window.postMessage(navigateData);
}