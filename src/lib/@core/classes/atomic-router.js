import { unmountPage, mountPage } from "../functions/mount";
import { AppRouterType } from "../enums/app-router-type.enum";

export class AtomicRouter {
    constructor(props) {
        const { routes, mode } = props;

        if (routes === undefined || mode === undefined)
            throw 'Route and mode object fields are mandatory.';

        this._routes = routes;

        this._parentDOMNode = null;
        this._previousPageRendered = null;

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
                this._useWindowHistoryChangeInterceptor();
                break;
            case AppRouterType.HASH:
                this.currentPath = () => {
                    const path = location.hash.slice(1).toLowerCase();
                    return path ? path : '/';
                };
                this.navigateTo = (path) => {
                    window.location.hash = path;
                };
                this._useWindowHashChangeInterceptor();
                break;
            default:
                break;
        }

        this._useWindowLoadInterceptor();
    }

    setParentDOMNode(parentDOMNode) {
        this._parentDOMNode = parentDOMNode;
    }

    _useWindowHistoryChangeInterceptor() {
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
            if (this._parentDOMNode)
                this._matchRoute();
        });

        window.addEventListener('popstate', () => {
            if (this._parentDOMNode)
                this._matchRoute();
        })
    }

    _useWindowHashChangeInterceptor() {
        window.addEventListener('hashchange', () => {
            if (this._parentDOMNode)
                this._matchRoute();
        });
    }

    _useWindowLoadInterceptor() {
        window.addEventListener('load', () => {
            this._matchRoute();
        }); 
    }

    _matchRoute() {
        if (this._previousPageRendered) {
            unmountPage(this._previousPageRendered);
        }
        const matchRoute = this._routes.find(r => r.path === this.currentPath());
        if (matchRoute) {
            const page = matchRoute.page;
            mountPage(page, this._parentDOMNode);
            this._previousPageRendered = page;
        }
    }
}