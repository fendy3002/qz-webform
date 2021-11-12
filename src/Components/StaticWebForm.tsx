import * as React from 'react';
import * as mobxReact from 'mobx-react';
import { toJS } from 'mobx';
let { observer, inject } = mobxReact;
import { WebForm } from './WebForm';
import * as types from '../types';

export interface StaticWebFormProps {
    elements: types.Element[],
    customParts?: types.Part.CustomPartSet,
    customLanguage?: types.LanguageCodePack,
    languageCode?: string
};
let constructor = (props: StaticWebFormProps) => {
    class StaticWebFormComponent extends React.Component<any, any> {
        constructor(prop) {
            super(prop);
        }
        render() {
            let store = this.props.store;
            let { data, error } = store;
            return <WebForm Elements={props.elements}
                data={data}
                error={error}
                Parts={props.customParts}
                Language={props.customLanguage}
                LanguageCode={props.languageCode}
                onChange={store.onChange} />
        }
    };
    return inject("store")(
        observer(StaticWebFormComponent)
    ) as any;
};
export {
    constructor as StaticWebForm
};