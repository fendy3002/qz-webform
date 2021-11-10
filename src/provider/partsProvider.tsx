import * as React from 'react';
import { PartsContext } from '../context/PartsContext';
import * as lo from 'lodash';
import * as predefinedParts from '../part';
export default (props) => {
    let { children, ...parts } = props;
    parts = lo.merge(parts, predefinedParts);

    return <PartsContext.Provider value={{
        parts: parts
    }}>{children}</PartsContext.Provider>;
};