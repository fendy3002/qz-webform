import * as React from 'react';
import * as types from '../types';
import * as Parts from '../part';

export interface PartsContextType {
    parts: {
        [tagName: string]: types.Part.Part
    }
};
export const PartsContext = React.createContext<PartsContextType>({
    parts: Parts
});