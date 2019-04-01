'use strict';

const {WhirlerBundle} = require('../type/Whirler');
const createFunction = require('./createFunction');
const verifyWhirles = require('../validation/verifyWhirles');
const {verifyClassName} = require('../validation/verifyName');

function combine(name, whirles, middleware) {
    verifyClassName(name);
    verifyWhirles(whirles);

    let bundle = createFunction(name, function () {
        let _this = WhirlerBundle.call(this) || this;
        return _this;
    });
    bundle.prototype = Object.create(WhirlerBundle.prototype);
    bundle.prototype.constructor = bundle;
    bundle.__proto__ = WhirlerBundle;

    bundle.prototype.__whirles = whirles;
    if(middleware instanceof Function)
        bundle.prototype.middleware = middleware;

    return bundle;
}

module.exports = combine;