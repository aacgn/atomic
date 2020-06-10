import { createOrganism } from "../../../src/index";

import "./index.css";

const DynamicMessage = (msg) => createOrganism({}, 'span', [], msg);

export default DynamicMessage;