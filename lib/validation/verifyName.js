'use strict';

const {FormattedError} = require('../error/OtherErrors');
const errorConstants = require('../constants/errorConstants');
const regexConstants = require('../constants/regexConstants');

function verifyClassName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(regexConstants.CLASS_NAME.test(name))
            return true;
        else if(regexConstants.FIRST_ALPHABETIC.test(name))
            throw new FormattedError(errorConstants.CLASS_NAME_CONTAIN);
        else throw new FormattedError(errorConstants.START_CLASS_NAME);
    } else throw new FormattedError(errorConstants.SPECIFY_CLASS_NAME);
}

function verifyFunctionName(name) {
    if(typeof name == 'string' && name.length > 0) {
        if(regexConstants.FUNCTION_NAME.test(name))
            return true;
        else if(regexConstants.FIRST_LOWERCASE.test(name))
            throw new FormattedError(errorConstants.FUNCTION_NAME_CONTAIN);
        else throw new FormattedError(errorConstants.START_FUNCTION_NAME);
    } else throw new FormattedError(errorConstants.SPECIFY_FUNCTION_NAME);
}

module.exports = {
    verifyClassName,
    verifyFunctionName
};