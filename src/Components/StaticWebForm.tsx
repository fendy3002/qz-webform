import * as React from 'react';
import * as mobxReact from 'mobx-react';
import { toJS } from 'mobx';
let { observer, inject } = mobxReact;
import { WebForm } from './WebForm';
import * as types from '../types';

export interface StaticWebFormProps {
    Elements: types.Element[],
    Parts?: types.Part.CustomPartSet,
    Language?: types.LanguageCodePack,
    LanguageCode?: string
};
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
                Parts={props.Parts}
                Language={props.Language}
                LanguageCode={props.LanguageCode}
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