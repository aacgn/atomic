import { createTemplate } from "../functions/create";

export function AtomicPage(config) {
    const { context, template } = config;
    return function (target) {
        target.prototype.template = template ? template : createTemplate({}, 'div', [], 'This is a default page component!');
        target.prototype.context = context ? context : {};
    }
};