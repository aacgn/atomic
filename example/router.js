import { AtomicRouter } from "../src";

import WelcomePage from "./pages/WelcomePage/index";
import CounterPage from "./pages/CounterPage";

import TransitionPage from "./pages/TransitionPage";

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
    mode: "history",
    transitionPage: TransitionPage()
});

export default Router;