'use strict';

const ExceptionMessages = require('../constants/ExceptionMessages');
const {FormattedError} = require('../error/OtherErrors');
const {ClassType} = require('extension-props');
const {WhirlerBundle, WhirlerCore} = require('../type/Whirler');
const {convertWhirles} = require('./convertWhirles');
const {verifyClassName} = require('../validation/verifyName');

function combine(name, ...whirles) {
    verifyClassName(name);
    whirles = convertWhirles(whirles);
    if (whirles.prototype instanceof WhirlerCore)
        return whirles;

    const bundle = ClassType.defineClass(name, WhirlerBundle);
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

module.exports = combine;
