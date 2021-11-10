import { useContext } from 'react';
import { TemplateContext } from '../context/TemplateContext';

let useTemplate = () => {
    const { template } = useContext(TemplateContext);
    return template;
};

export { useTemplate };