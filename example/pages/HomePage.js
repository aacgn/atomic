import { createTemplate } from "../../src/lib/index";

import DynamicMessage from "../components/DynamicMessage";
import RedirectTo from "../components/RedirecTo";

const HomePage = createTemplate({}, [
    DynamicMessage('Home Page!'),
    RedirectTo('WelcomePage', '/')
]);

export default HomePage;