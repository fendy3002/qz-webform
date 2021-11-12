import * as React from 'react';
import { PartsContext } from '../context/PartsContext';
import { merge } from 'lodash';
import * as predefinedParts from '../part';
import * as types from '../types';
export default (props) => {
    let { children, ...parts } = props;
    let passedParts = merge({}, predefinedParts, parts);

    return <PartsContext.Provider value={{
        parts: passedParts
    }}>{children}</PartsContext.Provider>;
};