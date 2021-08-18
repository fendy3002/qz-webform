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