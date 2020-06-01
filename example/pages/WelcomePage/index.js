import { AtomicPage, createTemplate } from "../../../src/lib/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

class WelcomePage extends AtomicPage {
    constructor(){
        super();
    }

    template() {
        return createTemplate({}, 'div', [    
                DynamicMessage('Welcome Page!'),
                RedirectTo('HomePage', '/home')
            ]);
    }
}


export default WelcomePage;