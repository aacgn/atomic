import { createTemplate } from "../../src/index";

import DynamicMessage from "../components/DynamicMessage";

const WelcomePage = createTemplate({}, [
    DynamicMessage('Welcome Page!')
]);

export default WelcomePage;