import WelcomePage from "./pages/WelcomePage/index";
import CounterPage from "./pages/CounterPage";

const Routes = [
    {
        path: '/',
        page: WelcomePage()
    },
    {
        path: '/counter',
        page: CounterPage()
    }
];

export default Routes;