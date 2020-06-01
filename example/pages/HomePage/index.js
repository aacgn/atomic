import { AtomicPage, createTemplate } from "../../../src/lib/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

class HomePage extends AtomicPage {
    constructor() {
        super();
    }

    template() {
        return createTemplate({}, 'div', [
                DynamicMessage('Home Page!'),
                RedirectTo('WelcomePage', '/')
            ]);
    }
}

export default HomePage;