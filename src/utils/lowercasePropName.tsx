/**
 * Lowercase given object's property keys
 * @memberof utils
 * @param prop {Object} key-value object
 * @returns {Object} prop with all of it's prop name changed to lowercase
 */
export const lowercasePropName = (prop) => {
    if (!prop) { return {}; }
    let result: any = {};
    for (let key of Object.keys(prop)) {
        result[key.toLowerCase()] = prop[key];
    }
    return result;
};