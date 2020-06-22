import { createOrganismElement, navigateTo } from "../../../src/index";

import "./index.css";

function onClickSpan(path) {
    navigateTo(path);
}

const RedirectTo = (msg, path) => createOrganismElement(
    'span',  
    { 
        style: { 
            'color': 'blue', 
            'cursor': 'pointer', 
            'text-decoration': 'underline'
        }
    },
    { 
        eventListener: 'click',
        eventHandler: () => onClickSpan(path),
        textContent: msg
    }
);

export default RedirectTo;