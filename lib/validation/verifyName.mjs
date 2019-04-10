'use strict';

import {FormattedError} from '../error/OtherErrors';
import ExceptionMessages from '../constants/ExceptionMessages';
import RegularExpression from '../constants/RegularExpression';

export function verifyClassName(name) {
    if (typeof name === 'string' && name.length > 0) {
        if (RegularExpression.CLASS_NAME.test(name))
            return true;
        else if (RegularExpression.FIRST_ALPHABETIC.test(name))
            throw new FormattedError(ExceptionMessages.CLASS_NAME_CONTAIN);
        else throw new FormattedError(ExceptionMessages.START_CLASS_NAME);
    } else throw new FormattedError(ExceptionMessages.SPECIFY_CLASS_NAME);
}

export function verifyFunctionName(name) {
    if (typeof name === 'string' && name.length > 0) {
        if (RegularExpression.FUNCTION_NAME.test(name))
            return true;
        else if (RegularExpression.FIRST_LOWERCASE.test(name))
            throw new FormattedError(ExceptionMessages.FUNCTION_NAME_CONTAIN);
        else throw new FormattedError(ExceptionMessages.START_FUNCTION_NAME);
    } else throw new FormattedError(ExceptionMessages.SPECIFY_FUNCTION_NAME);
}

export function verifyPropertyName(name) {
    if (typeof name === 'string' && name.length > 0) {
        if (RegularExpression.PROPERTY_NAME.test(name))
            return true;
        else if (RegularExpression.FIRST_LOWERCASE_OR_UNDERSCORE.test(name))
            throw new FormattedError(ExceptionMessages.PROPERTY_NAME_CONTAIN);
        else throw new FormattedError(ExceptionMessages.START_PROPERTY_NAME);
    } else throw new FormattedError(ExceptionMessages.SPECIFY_PROPERTY_NAME);
}
