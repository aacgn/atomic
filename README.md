# ![Atomic Logo](assets/atomic_logo.png)

Atomic is a JavaScript library for building horizontal micro frontends interfaces.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install atomic.

```bash
npm install @aacgn/atomic
```

## Usage

```javascript
import { Atomic, AtomicRouter, createPage, createTemplateElement } from "@aacgn/atomic";

const IndexPage = () => createPage(
    {
        context: {},
        mount: function() {
            return createTemplateElement(
                "span",
                {},
                {
                    textContent: "This is our index page!"
                } 
            );
        },
        onMount: function(ref) {
            console.log("hello!");
        },
        onUnmount: function(ref) {
            console.log("bye!");
        }
    }
);

const routes = [
    {
        path: "/",
        page: IndexPage()
    }
]

const Router = new AtomicRouter(
    {
        routes: routes,
        mode: "history"
    }
);

new Atomic(Router, document.getElementById('root'));
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/aacgn/atomic/blob/master/LICENSE)
