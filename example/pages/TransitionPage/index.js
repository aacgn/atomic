import { createTemplate, createPage } from "../../../src/index";

import "./index.css";

const TransitionPage = () => createPage(
    {
        mount: function(){
            return createTemplate({
                tag: "div",
                attr: {
                    style: {
                        "background-color":  "#000",
                        "position": "fixed",
                        "display": "flex",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "align-items": "center",
                        "color": "#FFF",
                        "top": 0,
                        "left": 0,
                        "right": 0,
                        "bottom": 0
                    }
                },
                props: {
                    textContent: "Aaaa"
                }
            })
        }
    }
);

export default TransitionPage;