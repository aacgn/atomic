import { createMolecule, createAtom, createOrganism } from "../../src/lib/index";

const DynamicMessage = (msg) => createOrganism({},[
    createMolecule({}, [
        createAtom({}, 'span', msg)
    ])
]);

export default DynamicMessage;