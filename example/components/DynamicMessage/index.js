import { createOrganism } from "../../../src/index";

import "./index.css";

const DynamicMessage = (msg) => createOrganism({ textContent: msg }, 'span');

export default DynamicMessage;