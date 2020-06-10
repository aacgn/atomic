import { createTemplate, AtomicPage } from "../../../src/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

@AtomicPage({
    'context': {}
})
class WelcomePage {

    constructor() {
        // Overide defaul template of Atomic Page
        this.template = this.render();
    }

    render() {
        return createTemplate({}, 'div', [    
            DynamicMessage('Welcome Page!'),
            RedirectTo('Home Page', '/home')
        ]);
    }
}

export default WelcomePage;