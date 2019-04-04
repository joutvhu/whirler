'use strict';

const {WhirlerBundle, WhirlerCore} = require('../type/Whirler');
const {FormattedError} = require('../error/OtherErrors');
const createWhirlerClass = require('./createWhirlerClass');
const convertWhirles = require('./convertWhirles');
const errorConstants = require('../constants/errorConstants');
const {verifyClassName} = require('../validation/verifyName');

function combine(name, ...whirles) {
    verifyClassName(name);
    whirles = convertWhirles(whirles);
    if (whirles.prototype instanceof WhirlerCore)
        return whirles;

    let bundle = createWhirlerClass(name, WhirlerBundle);
    function applyMiddleware(middleware) {
        if (!(middleware instanceof Function))
            throw new FormattedError(errorConstants.MIDDLEWARE_FUNCTION);
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