import { boostrap } from "../src/index";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";

const Routes = [
    {
        path: '/',
        template: WelcomePage
    },
    {
        path: '/home',
        template: HomePage
    }
];

boostrap(Routes, document.getElementById('root'));