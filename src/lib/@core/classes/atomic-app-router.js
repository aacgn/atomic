import { mount } from "../functions/mount";

export class AtomicAppRouter {
    constructor(routes, parentDOMNode) {
        this._routes = routes;
        this._parentDOMNode = parentDOMNode;

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
        const matchRoute = this._routes.find(r => r.path === this.currentPath());
        if (matchRoute) {
            const page = matchRoute.page;
            if (page && this._parentDOMNode)
                mount(page, this._parentDOMNode);
        }
    }
}