import * as React from 'react';
import * as types from '../types';

export interface Props {
    Element: types.Element,
    data: any
}
const calculateBoolean = (handler: boolean | ((data: any) => boolean), data) => {
    if (typeof (handler) == "boolean") {
        return handler;
    } else if (!handler) {
        return null;
    } else {
        return handler(data);
    }
};
const ElementComponent = (props: Props) => {
    const { Element, data } = props;

    let ElementProps: types.Component.ElementProps = {
        props: Element.props,
        tagName: Element.tagName,
        validation: {
            ...Element.validation,
            required: calculateBoolean(Element.validation?.required ?? false, data),
            readonly: calculateBoolean(Element.validation?.readonly ?? false, data),
            hidden: calculateBoolean(Element.validation?.hidden ?? false, data),
        },
        id: Element.id,
        name: Element.name,
        children: Element.children,
    };

};

export { ElementComponent };