import { mountTemplate } from "../v-dom/mount/index";

export class Router {
    constructor(routes, parentDOMNode) {
        this._routes = routes;
        this._parentDOMNode = parentDOMNode;

        this.useWindowLoadInterceptor();
        this.useWindowHashChangeInterceptor();
    }

    useWindowHashChangeInterceptor() {
        window.addEventListener('hashchange', () => {
            this.mount(this._routes, this._parentDOMNode);
        });
    }

    useWindowLoadInterceptor() {
        window.addEventListener('load', () => {
            this.mount(this._routes, this._parentDOMNode);
        }); 
    }

    navigateTo(path) {
        window.location.hash = path;
    }
    
    currentPath() {
        const path = location.hash.slice(1).toLowerCase();
        return path ? path : '/';
    }

    mount() {
        const matchRoute = this._routes.find(r => r.path === this.currentPath());
        if (matchRoute) {
            const template = matchRoute.template;
            if (this._parentDOMNode)
                this._parentDOMNode.innerHTML = "";
                mountTemplate(template, this._parentDOMNode);
        }
    }
}