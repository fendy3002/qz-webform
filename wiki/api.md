# API

The API is different between `staticform` (regular html / postback form) and `reactform`. For `staticform` we still need to compose a "library" (using react) with provided react templates, while for `reactform` we need to pass the webform as property and manage the error and data ourselves. For more concrete examples, see at those [examples](../examples).

# Staticform API

For `staticform` we still need to compose a "library" (using react) with provided react templates. The library usually composed like this:

``` javascript
import { fromTemplate } from '@fendy3002/qz-webform';
import template from './template';

let render = (element, value, option?: any) => {
    return fromTemplate(template, option)
        .elementStructure(element).render(value);
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

A xml string containing the structure to render. Example: 

```javascript
export default `
<Text name="name" label="Name (Text)" minLength="3" required=""></Text>
<Text name="username" label="Username (Text)" minLength="3" required=""></Text>
<Text name="email" label="Email (Text)" minLength="3" required=""></Text>
<ReactSelectAsync id="instituteselect" name="instituteKey" label="Institute (React Select Async)" 
    labelfield="instituteName" required=""></ReactSelectAsync>
`;
```

You can see [structure.md](./structure.md) for more information about structure.

## container component

The component that will render the `WebForm` component. The WebForm can be passed as `props` to container component. Example:

``` javascript
class App extends React.Component {
    render() {
        const { store, WebForm } = this.props;
        return <>
            {/* do not render if user null (not yet ready) */}
            {store.user &&
                <WebForm data={store.user} error={store.error} onChange={store.onFormChange}/>
            }
            <hr/>
            <textarea className="form-control" rows={5} value={JSON.stringify(store.user, null, 2)} readOnly></textarea>
        </>;
    }
}
```

## library api

The library api is the "glue" that combine and compose all parts while act as library that will be execued by front end. Example with mobx:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import structure from './structure';
import template from '../../react/template';
import store from './store';
import App from './App';
import { language, fromTemplate } from '../../../src/index';

let render = (element, userid, option?: any) => {
    let storeInstance = new store(userid);

    let webFormOption = {
        ...option,
        additionalContext: {
            "instituteselect": {
                select: {
                    loadOptions: storeInstance.searchInstitute
                }
            }
        }
    };
    return fromTemplate(template, webFormOption)
        .xmlStructure(structure)
        .webForm(language.en)
        .then(WebForm => {
            ReactDOM.render(
                <MobxReact.Provider store={storeInstance}>
                    <App WebForm={WebForm} />
                </MobxReact.Provider>,
                element
            );
        });
};
(window as any).QzWebForm = {
    render
};
```

Then we can use in html page like this:

``` javascript
// the element containing the structure
let qzWebFormElement = document.getElementById("qzwebform");
let userid = "1";
QzWebForm.render(qzWebFormElement, userid, {
    readOnly: false
});
```