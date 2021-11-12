export const makeError = (name: string, error?: string) => { return { [name]: error }; }
export const makeNoError = (name: string) => { return { [name]: "" }; }