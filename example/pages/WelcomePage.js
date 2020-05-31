import { createTemplate } from "../../src/lib/index";

import DynamicMessage from "../components/DynamicMessage";
import RedirectTo from "../components/RedirecTo";

const WelcomePage = createTemplate({}, [
    DynamicMessage('Welcome Page!'),
    RedirectTo('HomePage', '/home')
]);

export default WelcomePage;