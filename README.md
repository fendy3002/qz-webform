# qz-webform

An effort to unify common components appearance and usability across both react and html (javascript).

Define components template with react, define your xml / html structure then use it on both react and html page with autogrid. Try at [fendy3002.github.io/qz-webform/](https://fendy3002.github.io/qz-webform/). This consist of three important parts: Template, Structure and API.

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

XML or HTML tags that want to be rendered. Complete documentation about structure can be viewed at [structure.md](./wiki/structure.md).

In HTML, we can use dom elements to define the structure. Example usage in HTML:

```html
<div id="qzwebform">
    <Text name="name" label="Name (Text)" minLength="3" required></Text>
    <Text name="city" label="City (Text)" readOnly></Text>
    <Text name="province"></Text>
    <RowBreak></RowBreak>
    <Number name="height" min="100" label="Height (Number)" required></Number>
    <Textarea name="address" label="Address (Textarea)" required></Textarea>
    <Checkbox name="hasJob" label="Has Job?"></Checkbox>
    <RowBreak></RowBreak>
    <Select name="nationality" label="Nationality (Select)" required>
        <option>-- SELECT ONE --</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="us">United States</option>
    </Select>
    <Select name="nationality" label="Nationality (Select)" readOnly>
        <option>-- SELECT ONE --</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="us">United States</option>
    </Select>
    <ReactSelect name="nationality" label="Nationality (React Select)" required>
        <option>-- SELECT ONE --</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="us">United States</option>
    </ReactSelect>
    <ReactSelect name="nationality" label="Nationality (React Select)" readOnly>
        <option>-- SELECT ONE --</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="us">United States</option>
    </ReactSelect>
    <ReactSelectAsync id="selectasync" name="userKey" labelfield="userName"
        label="User (React Select Async)">
    </ReactSelectAsync>
    <Text name="note"></Text>
    <FullColumn>
        <Text name="fullcolumntext"></Text>
    </FullColumn>
    <Text name="text"></Text>
</div>
```

With react, we'll be using XML string to define the structure The tags and attributes should be the same, except xml does not support empty attribute, so we need to supply empty string or any value. Example usage in react:

```javascript
import { react } from '@fendy3002/qz-webform';
// import 
export default (option?: any) => {
    // empty value for required or readonly is needed, for a valid XML
    return react.prepareStructure(`
        <Text name="name" label="Name (Text)" minLength="3" required=""></Text>
        <Text name="username" label="Username (Text)" minLength="3" required=""></Text>
        <Text name="email" label="Email (Text)" minLength="3" required=""></Text>
        <ReactSelectAsync id="instituteselect" name="instituteKey" label="Institute (React Select Async)" 
            labelfield="instituteName" required=""></ReactSelectAsync>
    `, option);
};
```

# API

Complete documentation about API can be viewed at [api.md](./wiki/api.md).