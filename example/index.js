import { Atomic } from "../src/index";

import Router from "./router";

new Atomic(
    Router,
    document.getElementById("root")
);