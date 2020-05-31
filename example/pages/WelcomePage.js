import { createTemplate } from "../../src/lib/index";

import DynamicMessage from "../components/DynamicMessage";

const WelcomePage = createTemplate({}, [
    DynamicMessage('Welcome Page!')
]);

export default WelcomePage;