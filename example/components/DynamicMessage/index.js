import { createOrganism } from "../../../src/lib/index";

import "./index.css";

const DynamicMessage = (msg) => createOrganism({}, 'span', [], msg);

export default DynamicMessage;