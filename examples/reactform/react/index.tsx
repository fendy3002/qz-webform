import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import structureConstruct from './structure';
import template from '../../react/template';
import store from './store';
import App from './App';
import { language, react, webform } from '../../../src/index';

let render = (element, userid, option?: any) => {
    let storeInstance = new store(userid);

    return structureConstruct(option)
        // get only the structure props 
        .then(({ structure, context }) => {
            let WebForm = react.webForm({
                template: template,
                structure: structure,
                context: {
                    ...context,
                    "instituteselect": {
                        ...context.instituteselect,
                        select: {
                            loadOptions: storeInstance.searchInstitute
                        }
                    }
                },
                language: language.en,
            });

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