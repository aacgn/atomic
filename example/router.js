import { AtomicRouter } from "../src";

import WelcomePage from "./pages/WelcomePage/index";
import CounterPage from "./pages/CounterPage";

const routes = [
    {
        path: '/',
        page: WelcomePage()
    },
    {
        path: '/counter',
        page: CounterPage()
    }
];

const Router = new AtomicRouter({
    routes: routes,
    mode: "history"
});

export default Router;