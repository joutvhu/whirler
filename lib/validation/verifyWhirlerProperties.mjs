'use strict';

import {FormattedError} from '../error/OtherErrors';
import {verifyFunctionName, verifyPropertyName} from './verifyName';
import ExceptionMessages from '../constants/ExceptionMessages';
import RegularExpression from '../constants/RegularExpression';
import getAllPropertyNames from '../utilities/getAllPropertyNames';

export function verifyWhirlerFunctions(whirler) {
    const properties = getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware' && !(whirler[i] instanceof Function))
            throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        if (!['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

export function verifyWhirlerProperties(whirler) {
    const properties = getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware') {
            if (!(whirler[i] instanceof Function))
                throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        } else if (!RegularExpression.SYSTEM_FUNCTION.includes(i))
            verifyPropertyName(i);
    }
}
