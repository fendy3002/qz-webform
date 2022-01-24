import * as Base from './Base';

export interface CustomParser {
    (props: {
        Element: Base.Element,
        xml: any,
    }, tools: {
        parseChild: (xml: any) => Element,
        lowercasePropName: (prop: any) => any
    }): Base.Element
}
export interface CustomParserSet {
    [tagName: string]: CustomParser
}
export interface Context {
    [id: string]: any
};