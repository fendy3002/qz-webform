import * as React from 'react';
import { Part as PartType } from '../types';
import * as Parts from '../part';

export interface PartsContextType {
    parts: {
        [tagName: string]: PartType.Part
    }
};
export const PartsContext = React.createContext<PartsContextType>({
    parts: Parts
});