import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import WebFormConstruct from '../../../src/index';
import template from './template';
import store from './store';

let render = (element, userid, option?: any) => {

    let storeInstance = new store(userid);
    ReactDOM.render(
        <MobxReact.Provider store={storeInstance}>
            <App />
        </MobxReact.Provider>,
        element
    );
};
export {
    render
};