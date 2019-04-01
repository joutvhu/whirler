'use strict';

const errorConstants = require('../constants/errorConstants');
const regexConstants = require('../constants/regexConstants');

function verifyClassName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(regexConstants.CLASS_NAME.test(name))
            return true;
        else if(regexConstants.FIRST_ALPHABETIC.test(name))
            throw new Error(errorConstants.CLASS_NAME_CONTAIN);
        else throw new Error(errorConstants.START_CLASS_NAME);
    } else throw new Error(errorConstants.SPECIFY_CLASS_NAME);
}

function verifyFunctionName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(regexConstants.FUNCTION_NAME.test(name))
            return true;
        else if(regexConstants.FIRST_LOWERCASE.test(name))
            throw new Error(errorConstants.FUNCTION_NAME_CONTAIN);
        else throw new Error(errorConstants.START_FUNCTION_NAME);
    } else throw new Error(errorConstants.SPECIFY_FUNCTION_NAME);
}

module.exports = {
    verifyClassName,
    verifyFunctionName
};