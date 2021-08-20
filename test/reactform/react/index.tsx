import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import structure from './structure';
import template from '../../react/template';
import store from './store';
import App from './App';
import { language, fromTemplate } from '../../../src/index';
// import { language, fromTemplate } from '@fendy3002/qz-webform';

let render = (element, userid, option?: any) => {
    let storeInstance = new store(userid);

    let webFormOption = {
        ...option,
        additionalContext: {
            "instituteselect": {
                select: {
                    loadOptions: storeInstance.searchInstitute
                }
            },
            "shufflename": {
                "button": {
                    "onClick": (evt, {data, setData, setError}) => {
                        setData((prev) => {
                            return {
                                // shuffle snippet: https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
                                name: prev.name.split('').sort(function(){return 0.5-Math.random()}).join('')
                            };
                        })
                    }
                }
            },
            "clearname": {
                "button": {
                    "onClick": (evt, {data, setData, setError}) => {
                        setData((prev) => {
                            return {
                                name: ""
                            };
                        });
                        setError((prev) => {
                            return {
                                name: "required"
                            }
                        })
                    }
                }
            },
            
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