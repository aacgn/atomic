import { createMolecule, createAtom, createOrganism } from "../../src/lib/index";

function onClickSpan(path) {
    window.location.hash = path;
}

const RedirectTo = (msg, path) => createOrganism({},[
    createMolecule({}, [
        createAtom({ 'onClick': () => onClickSpan(path), 'style': { 'color': 'blue', 'cursor': 'pointer', 'text-decoration': 'underline' }}, 'span', msg)
    ])
]);

export default RedirectTo;