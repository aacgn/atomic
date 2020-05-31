import { createTemplate } from "../../src/index";

import DynamicMessage from "../components/DynamicMessage";

const HomePage = createTemplate({}, [
    DynamicMessage('Home Page!')
]);

export default HomePage;