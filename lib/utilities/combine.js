'use strict';

const {ClassType} = require('extension-props');
const {WhirlerBundle, WhirlerCore} = require('../type/Whirler');
const {convertWhirles} = require('./convert');
const {verifyClassName} = require('../validation/verifyName');
const {verifyMiddleware} = require('../validation/verifyWhirler');

function combine(name, ...whirles) {
    verifyClassName(name);
    whirles = convertWhirles(whirles);
    if (whirles.prototype instanceof WhirlerCore)
        return whirles;

    const bundle = ClassType.defineClass(name, WhirlerBundle);
    Object.defineProperty(bundle, 'apply', {
        value: function applyMiddleware(middleware) {
            verifyMiddleware(middleware);
            bundle.prototype.middleware = middleware;
            return bundle;
        },
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
