import { createTemplate, AtomicPage } from "../../../src/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

@AtomicPage({})
class HomePage {

    constructor() {
        // Overide defaul template of Atomic Page
        this.template = this.render();
    }

    render() {
        return createTemplate({}, 'div', [    
            DynamicMessage('Home Page!'),
            RedirectTo('WelcomePage', '/')
        ]);
    }
}

export default HomePage;