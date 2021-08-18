# API

The API is different between `staticform` (regular html / postback form) and `reactform`. For `staticform` we still need to compose a "library" (using react) with provided react templates, while for `reactform` we need to pass the webform as property and manage the error and data ourselves. For more concrete examples, see at those [examples](../examples).

# Staticform API

For `staticform` we still need to compose a "library" (using react) with provided react templates. The library usually composed like this:

``` javascript
import { webform as WebFormConstruct } from '@fendy3002/qz-webform';
import template from './template';

let render = (element, value, option?: any) => {
    let WebForm = WebFormConstruct(template, option);
    return WebForm.elementStructure(element).render(value);
};
(window as any).QzWebForm = {
    render
};
```

Then we can use in html page like this:

``` javascript
// the element containing the structure
let qzWebFormElement = document.getElementById("elementID");
let data = {
    key: "value",
    // your key-value data here
};
let option = {
    // qzWebForm option here
};
window.QzWebForm.render(
    qzWebFormElement, data, option
);
```

You can see [template.md](./template.md) for more information about template.

# Reactform API

The reactform usually consist of template, structure, the container component and the library api. You can see [template.md](./template.md) for more information about template.

## structure



## container component

## api