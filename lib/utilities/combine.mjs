'use strict';

import {WhirlerBundle, WhirlerCore} from '../type/Whirler';
import {FormattedError} from '../error/OtherErrors';
import {convertWhirles} from './convertWhirles';
import {createClass} from './dynamicDefinition';
import {verifyClassName} from '../validation/verifyName';
import ExceptionMessages from '../constants/ExceptionMessages';

export default function combine(name, ...whirles) {
    verifyClassName(name);
    whirles = convertWhirles(whirles);
    if (whirles.prototype instanceof WhirlerCore)
        return whirles;

    const bundle = createClass(name, WhirlerBundle);
    function applyMiddleware(middleware) {
        if (!(middleware instanceof Function))
            throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        bundle.prototype.middleware = middleware;
    }
    Object.defineProperty(bundle, 'middleware', {
        value: applyMiddleware,
        configurable: false,
        writable: false
    });

    Object.defineProperty(bundle.prototype, '__whirles', {
        value: whirles,
        configurable: false,
        writable: false
    });

    return bundle;
}
