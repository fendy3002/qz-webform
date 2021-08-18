# qz-webform

Define form template with react, then use it on both react and html page with autogrid. Try at [fendy3002.github.io/qz-webform/](https://fendy3002.github.io/qz-webform/). This consist of three important parts: Template, Structure and API.

# Installation and usage

Installation using npm

```shell
npm i @fendy3002/qz-webform
```

Installation using yarn
```shell
yarn add @fendy3002/qz-webform
```

# Template

Template is a react (.tsx) file. It export default a key-value tags to be rendered as html elements.
The tags supported at the moment:

* text
* textarea
* number
* checkbox
* select
* reactselect
* reactselectasync
* row
* fullcolumn
* column

Complete documentation about template can be viewed at [template.md](./wiki/template.md). Example usage:

```javascript
import React from 'react';
export default {
    "text": ({ name, readonly, value, label, error, placeholder, dataset, validation,
        onChange }) => {
        let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
        return <div className="form-floating">
            <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                value={value} readOnly={readonly} placeholder={placeholder} {...dataset}
                onChange={onChange} />
            {label &&
                <label>{label}&nbsp;{requiredSign}</label>
            }
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
        </div>;
    }
};
```

# Structure

