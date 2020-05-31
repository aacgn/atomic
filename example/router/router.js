import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";

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

export default Routes;