import * as React from 'react';
import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;

import { WebForm } from './WebForm';
import * as types from '../types';

export interface StaticWebFormProps {
    Elements: types.Element[],
    Parts?: types.Part.CustomPartSet,
    Language?: types.LanguageCodePack,
    LanguageCode?: string,
    readonly?: boolean | ((data: any) => boolean)
};

/**
 * @module Components/StaticWebForm
 */
/**
 * Return a boolean from either a boolean, or a function that return boolean
 * @param handler {Boolean | function} either a boolean, or a function that return boolean
 * @param data {Object} optional, data to be used as context in handler
 * @returns a boolean
 */
const calculateBoolean = (handler: boolean | ((data: any) => boolean), data ?: any) => {
    if (typeof (handler) == "boolean") {
        return handler;
    } else if (!handler) {
        return null;
    } else {
        return handler(data);
    }
};

/**
 * @module Components/StaticWebForm
 */
/**
 * 
 * Creates a WebForm component with it's props are managed 
 * so it can be used in page without compiling ReacJS code again
 * 
 * @param props {Object} the property object consists of:
 * <br/>props.Elements {Array[types.Element]} parsed element info to be rendered
 * <br/>props.Parts {Object} parts to be used as template
 * <br/>props.Language {Object} language content
 * <br/>props.LanguageCode {string} language code
 * <br/>props.readonly {boolean} set whether rendering readonly components or not
 * @returns {Object} ReactComponent
 */
let constructor = (props: StaticWebFormProps) => {
    class StaticWebFormComponent extends React.Component<any, any> {
        constructor(prop) {
            super(prop);
        }
        render() {

            let store = this.props.store;
            let { data, error } = store;
            return <WebForm Elements={props.Elements}
                data={data}
                error={error}
                readonly={calculateBoolean(props.readonly ?? false, data)}
                Parts={props.Parts}
                Language={props.Language}
                LanguageCode={props.LanguageCode}
                onChange={store.onChange} />;
        }
    };
    return inject("store")(
        observer(StaticWebFormComponent)
    ) as any;
};
export {
    constructor as StaticWebForm
};