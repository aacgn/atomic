import { createOrganism, navigateTo } from "../../../src/index";

import "./index.css";

const RedirectTo = (msg, path) => createOrganism({
    tag: "span",
    attr: {
        style: { 
            'color': 'blue', 
            'cursor': 'pointer', 
            'text-decoration': 'underline'
        }
    },
    props: {
        eventListener: 'click',
        eventHandler: () => navigateTo(path),
        textContent: msg
    }
});

export default RedirectTo;