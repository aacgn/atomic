# ![Atomic Logo](assets/atomic_logo.png)

Atomic is a JavaScript library for building horizontal micro frontends interfaces.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install atomic.

```bash
npm install atomic
```

## Usage

```javascript
import { bootstrap, createPage, createTemplate } from "atomic";

const IndexPage = () => createPage(
    {
        name: "index",
        context: {},
        mount: function() {
            return createTemplate(
                {},
                "span", 
                [],
                "This is our index page!"
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

const Routes = [
    {
        path: "/",
        page: IndexPage()
    }
]

bootstrap(Routes, document.getElementById('root'));
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/aacgn/atomic/blob/master/LICENSE)
