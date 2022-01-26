import * as React from 'react';
import * as types from '../types';
import { PartsContext } from '../context/PartsContext';
import { useParts } from '../hooks/useParts';

export interface ElementComponentProps {
    Element: types.Element,
    data: any,
    error: any,
    onChange?: (props: {
        data: any,
        error: {
            [key: string]: string
        }
    }) => void,
    readonly?: boolean
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
const DefaultLogic = ({ Component, Element }) => <Component {...Element.props} />;
const ElementComponent = (props: ElementComponentProps) => {
    const parts = useParts();
    const { Element, data, error, readonly, onChange } = props;

    let ElementProps: types.Component.ElementProps = {
        props: Element.props,
        tagName: Element.tagName,
        validation: {
            ...Element.validation,
            required: calculateBoolean(Element.validation?.required ?? false, data),
            readonly: (calculateBoolean(Element.validation?.readonly ?? false, data) || (readonly ?? false)) &&
                !calculateBoolean(Element.validation?.editable ?? false, data),
            hidden: calculateBoolean(Element.validation?.hidden ?? false, data),
        },
        id: Element.id,
        name: Element.name,
        children: Element.children,
        context: Element.context
    };

    ElementProps.props = {
        ...ElementProps.props,
        required: ElementProps.validation.required,
        readonly: ElementProps.validation.readonly,
        hidden: ElementProps.validation.hidden,
    };
    let tagPart = parts[Element.tagName];
    if (!tagPart) {
        throw new Error(`Parts for tag "${Element.tagName}" not found`);
    }
    let Tag = tagPart.Logic ?? DefaultLogic;
    let children = [];
    if (Element.children && Element.children.length > 0) {
        for (let child of Element.children) {
            children.push(
                <ElementComponent key={child.id} Element={child} readonly={readonly}
                    onChange={onChange} data={data} error={error}></ElementComponent>
            );
        }
    }
    return <Tag Element={ElementProps}
        Component={tagPart.Component}
        data={data} error={error} onChange={onChange}
    >{children}</Tag>;
};

export { ElementComponent };