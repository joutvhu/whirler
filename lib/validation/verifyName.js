'use strict';

const {FormattedError} = require('../error/OtherErrors');
const ExceptionMessages = require('../constants/ExceptionMessages');
const RegularExpression = require('../constants/RegularExpression');

function verifyClassName(name) {
    if (typeof name === 'string' && name.length > 0) {
        if (RegularExpression.CLASS_NAME.test(name))
            return true;
        else if (RegularExpression.FIRST_ALPHABETIC.test(name))
            throw new FormattedError(ExceptionMessages.CLASS_NAME_CONTAIN);
        else throw new FormattedError(ExceptionMessages.START_CLASS_NAME);
    } else throw new FormattedError(ExceptionMessages.SPECIFY_CLASS_NAME);
}

function verifyFunctionName(name) {
    if (typeof name === 'string' && name.length > 0) {
        if (RegularExpression.FUNCTION_NAME.test(name))
            return true;
        else if (RegularExpression.FIRST_LOWERCASE.test(name))
            throw new FormattedError(ExceptionMessages.FUNCTION_NAME_CONTAIN);
        else throw new FormattedError(ExceptionMessages.START_FUNCTION_NAME);
    } else throw new FormattedError(ExceptionMessages.SPECIFY_FUNCTION_NAME);
}

module.exports = {
    verifyClassName,
    verifyFunctionName
};
