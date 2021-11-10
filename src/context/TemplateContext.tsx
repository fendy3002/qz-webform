import * as React from 'react';
import * as Parts from '../part';

export interface TemplateContextType {
    template: {
        [tagName: string]: React.ComponentType<any>
    }
};
export const TemplateContext = React.createContext<TemplateContextType>({
    template: {}
});