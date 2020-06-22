import { createTemplateElement, createPage } from "../../../src/index";

import "./index.css";

import DynamicMessage from "../../components/DynamicMessage/index";
import RedirectTo from "../../components/RedirectTo/index";

const WelcomePage = () => createPage(
    {
        context: {},
        mount: function(){
            return createTemplateElement('div', {},
                {
                    children: [    
                        DynamicMessage(`Welcome Page!`),
                        RedirectTo('Counter Page', '/counter')
                    ]
                }
            )
        },
        onMount: function(ref) {
            console.log('hello!');
        },
        onUnmount: function(ref) {
            console.log('bye!');
        }
    }
);

export default WelcomePage;