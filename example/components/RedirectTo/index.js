import { createOrganism } from "../../../src/lib/index";

import "./index.css";

function onClickSpan(path) {
    window.location.hash = path;
}

const RedirectTo = (msg, path) => createOrganism(
    { 
        'onClick': () => onClickSpan(path), 
        'style': { 'color': 'blue', 'cursor': 'pointer', 'text-decoration': 'underline' }
    },
    'span', [], msg);

export default RedirectTo;