import { createOrganismElement } from "../../../src/index";

import "./index.css";

const DynamicMessage = (msg) => createOrganismElement('span', {}, { textContent: msg });

export default DynamicMessage;