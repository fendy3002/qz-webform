import * as React from 'react';
import * as types from '../types';
import { useParts } from '../hooks/useParts';

export interface Props {
    Element: types.Element,
    data: any,
    onChange?: (props: {
        data: any,
        error: {
            [key: string]: string
        }
    }) => void,
};
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
    const { Element, data, onChange } = props;
    const parts = useParts();

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
    let Tag = parts[Element.tagName].Logic;
    let children = [];
    if (Element.children && Element.children.length > 0) {
        for (let child of Element.children) {
            children.push(
                <ElementComponent Element={child} onChange={onChange} data={data}></ElementComponent>
            );
        }
    }
    return <Tag Element={ElementProps}
        Component={parts[Element.tagName].Component}
        data={data} onChange={onChange}
    >{children}</Tag>;
};

export { ElementComponent };