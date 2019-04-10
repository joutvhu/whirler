'use strict';

import {FormattedError} from '../error/OtherErrors';
import {verifyFunctionName} from './verifyName';
import ExceptionMessages from '../constants/ExceptionMessages';
import getAllPropertyNames from '../utilities/getAllPropertyNames';

export default function verifyWhirlerFunctions(whirler) {
    const properties = getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware' && !(whirler[i] instanceof Function))
            throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        if (!['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}
