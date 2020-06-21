import { unmountPage, mountPage } from "../functions/mount";
import { AppRouterType } from "../enums/app-router-type.enum";

export class AtomicAppRouter {
    constructor(routes, parentDOMNode, mode) {
        this._routes = routes;
        this._parentDOMNode = parentDOMNode;

        this._previousPageRendered = null;
        
        this.currentPath = () => { };
        this.navigateTo = (path) => { };

        switch(mode) {
            case AppRouterType.HISTORY:
                this.currentPath = () => {
                    const path = window.location.pathname;
                    return path ? path : '/';
                };
                this.navigateTo = (path) => {
                    window.history.pushState(
                        {},
                        path,
                        window.location.origin + path
                    );
                };
                this.useWindowHistoryChangeInterceptor();
                break;
            case AppRouterType.HASH:
                this.currentPath = () => {
                    const path = location.hash.slice(1).toLowerCase();
                    return path ? path : '/';
                };
                this.navigateTo = (path) => {
                    window.location.hash = path;
                };
                this.useWindowHashChangeInterceptor();
                break;
            default:
                break;
        }

        this.useWindowLoadInterceptor();
    }

    useWindowHistoryChangeInterceptor() {
        history.pushState = ( f => function pushState(){
            const ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        })(history.pushState);
        
        history.replaceState = ( f => function replaceState(){
            const ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        })(history.replaceState);

        window.addEventListener('locationchange', () => {
            this.matchRoute();
        });

        window.addEventListener('popstate', () => {
            this.matchRoute();
        })
    }

    useWindowHashChangeInterceptor() {
        window.addEventListener('hashchange', () => {
            this.matchRoute();
        });
    }

    useWindowLoadInterceptor() {
        window.addEventListener('load', () => {
            this.matchRoute();
        }); 
    }

    matchRoute() {
        if (this._previousPageRendered) {
            unmountPage(this._previousPageRendered, this._parentDOMNode);
        }
        const matchRoute = this._routes.find(r => r.path === this.currentPath());
        if (matchRoute) {
            const page = matchRoute.page;
            mountPage(page, this._parentDOMNode);
            this._previousPageRendered = page;
        }
    }
}