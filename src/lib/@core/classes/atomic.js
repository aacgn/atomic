export class Atomic {
    constructor(router, parentDOMNode) {
        this._router = router;
        this._router.setParentDOMNode(parentDOMNode);

        this._useMessageInterceptor();
    }

    _useMessageInterceptor() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data && data.hasAtomicSignature) {
                switch(data.event) {
                    case "navigate":
                        this._router.navigateTo(data.data);
                        break;
                    default:
                        const customEvent = new CustomEvent(data.event, {
                            detail: data.data
                        });
                        window.dispatchEvent(customEvent);
                        break;
                }
            }
        }, false);
    }
}
