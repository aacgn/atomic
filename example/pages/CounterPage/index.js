import { createTemplate, createPage, updateContext } from "../../../src/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

const CounterPage = () => createPage(
    {
        name: "welcome",
        context: {
            counter: 0
        },
        mount: function() {
            const counter = this.context.counter;

            return createTemplate({
                tag: "div",
                attr: {},
                props: {
                    children: [    
                        DynamicMessage(`Counter: ${counter}`),
                        RedirectTo('Welcome Page', '/')
                    ]
                }
            });
        },
        onMount: function(ref) {
            setInterval(() => {
                updateContext(ref, 'counter', parseInt(this.context.counter) + 100);
            }, 1000);
        }
    }
);

export default CounterPage;