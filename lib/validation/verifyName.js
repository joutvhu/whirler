const errorConstants = require('../constants/errorConstants');

const classRegex = /^[a-z][a-z0-9_]*$/i;
const functionRegex = /^[a-z][a-zA-Z0-9_]*$/;
const firstAlphabetic = /^[a-z]/i;
const firstLowercase = /^[a-z]/;

function verifyClassName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(classRegex.test(name))
            return true;
        else if(firstAlphabetic.test(name))
            throw new Error(errorConstants.CLASS_NAME_CONTAIN);
        else throw new Error(errorConstants.START_CLASS_NAME);
    } else throw new Error(errorConstants.SPECIFY_CLASS_NAME);
}

function verifyFunctionName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(functionRegex.test(name))
            return true;
        else if(firstLowercase.test(name))
            throw new Error(errorConstants.FUNCTION_NAME_CONTAIN);
        else throw new Error(errorConstants.START_FUNCTION_NAME);
    } else throw new Error(errorConstants.SPECIFY_FUNCTION_NAME);
}

module.exports = {
    verifyClassName,
    verifyFunctionName
};