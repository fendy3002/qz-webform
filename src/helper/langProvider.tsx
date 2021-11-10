import * as React from 'react';
import { LangContext } from '../context/LangContext';
import * as lo from 'lodash';
import * as predefinedLang from '../lang';
export default (props) => {
    let { children, ...lang } = props;
    lang = lo.merge(lang, predefinedLang);

    return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};