export interface LanguagePack {
    [tagName: string]: {
        [validationKey: string]: string
    }
};
export interface LanguageCodePack {
    [languageCode: string]: LanguagePack
};