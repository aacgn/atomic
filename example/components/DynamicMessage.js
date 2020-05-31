import { createMolecule, createAtom, createOrganism } from "../../src/index";

const DynamicMessage = (msg) => createOrganism({},[
    createMolecule({}, [
        createAtom({}, 'span', msg)
    ])
]);

export default DynamicMessage;