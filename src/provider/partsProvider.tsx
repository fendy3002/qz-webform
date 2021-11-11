import * as React from 'react';
import { PartsContext } from '../context/PartsContext';
import * as lo from 'lodash';
import * as predefinedParts from '../part';
import * as types from '../types';
export default (props) => {
    let { children, ...parts } = props;
    let passedParts = {
        ...predefinedParts
    };
    for (let tagName of Object.keys(parts)) {
        let tagPart: types.Part.CustomPart = parts[tagName];
        passedParts[tagName] = {
            ...passedParts[tagName],
            ...tagPart
        };
    }

    return <PartsContext.Provider value={{
        parts: passedParts
    }}>{children}</PartsContext.Provider>;
};