import { unmountPage, mountPage, mountTransitionPage, unmountTransitionPage } from "../functions/mount";
import { AtomicRouterMode } from "../enums/atomic-router-mode.enum";

export class AtomicRouter {
    constructor(props) {

        const { routes, mode, transitionPage } = props;

        this._routes = routes;
        this._mode = mode;
        this._transitionPage = transitionPage;

        this._isTransitionPageEnable = false;

        this._parentDOMNode = null;
        this._previousPageRendered = null;

        switch(this._mode) {
            case AtomicRouterMode.HISTORY:
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
            case AtomicRouterMode.HASH:
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

    enableTransitionPage() {
        if (this._transitionPage && !this._isTransitionPageEnable) {
            mountTransitionPage(this._previousPageRendered, this._transitionPage);
            this._isTransitionPageEnable = true;   
        }
    }

    disableTransitionPage() {
        if (this._transitionPage) 
            unmountTransitionPage(this._previousPageRendered, this._transitionPage);
            this._isTransitionPageEnable = false;
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
            window.postMessage( {
                hasAtomicSignature: true,
                event: "_startMicrofrontRequest"
            });
            mountPage(page, this._parentDOMNode);
            this._previousPageRendered = page;
        }
    }
}