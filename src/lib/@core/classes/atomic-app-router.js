import { unmount, mount } from "../functions/mount";

export class AtomicAppRouter {
    constructor(routes, parentDOMNode) {
        this._routes = routes;
        this._parentDOMNode = parentDOMNode;

        this._previousPageRendered = null;

        this.useWindowLoadInterceptor();
        this.useWindowHashChangeInterceptor();
    }

    useWindowHashChangeInterceptor() {
        window.addEventListener('hashchange', () => {
            this.matchRoute(this._routes, this._parentDOMNode);
        });
    }

    useWindowLoadInterceptor() {
        window.addEventListener('load', () => {
            this.matchRoute(this._routes, this._parentDOMNode);
        }); 
    }

    navigateTo(path) {
        window.location.hash = path;
    }
    
    currentPath() {
        const path = location.hash.slice(1).toLowerCase();
        return path ? path : '/';
    }

    matchRoute() {
        if (this._previousPageRendered) {
            unmount(this._previousPageRendered, this._parentDOMNode, true);
        }
        const matchRoute = this._routes.find(r => r.path === this.currentPath());
        if (matchRoute) {
            const page = matchRoute.page;
            mount(page, this._parentDOMNode);
            this._previousPageRendered = page;
        }
    }
}