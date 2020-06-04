import { createTemplate } from "../functions/create";

export class AtomicPage {
    constructor(){
    }

    setContext(partialContext){
        const newContext = Object.assign({}, this.context, partialContext);
        this.context = newContext;
    }

    //will be overridden
    template() {
        return createTemplate({}, 'div');
    }
}