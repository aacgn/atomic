import { createTemplate, createPage, updateContext } from "../../../src/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

const CounterPage = () => createPage(
    {
        name: "counter",
        context: {
            counter: 0
        },
        mount: function() {
            const counter = this.context.counter;

            return createTemplate({}, 'div', [    
                DynamicMessage(`Counter: ${counter}`),
                RedirectTo('Welcome Page', '/')
            ])
        },
        onMount: function(ref) {
            setTimeout(() => {
                updateContext(ref, 'counter', parseInt(this.context.counter) + 100);
            }, 1000);
        }
    }
);

export default CounterPage;