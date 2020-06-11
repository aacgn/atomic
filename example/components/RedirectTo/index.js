import { createOrganism, navigateTo } from "../../../src/index";

import "./index.css";

function onClickSpan(path) {
    navigateTo(path);
}

const RedirectTo = (msg, path) => createOrganism(
    { 
        'onClick': () => onClickSpan(path), 
        'style': { 'color': 'blue', 'cursor': 'pointer', 'text-decoration': 'underline' }
    },
    'span', [], msg);

export default RedirectTo;