'use strict';

exports.default = combine;

var _Whirler = require("../type/Whirler");

var _OtherErrors = require("../error/OtherErrors");

var _convertWhirles = require("./convertWhirles");

var _dynamicDefinition = require("./dynamicDefinition");

var _verifyName = require("../validation/verifyName");

var _ExceptionMessages = require("../constants/ExceptionMessages");

function combine(name, ...whirles) {
  (0, _verifyName.verifyClassName)(name);
  whirles = (0, _convertWhirles.convertWhirles)(whirles);
  if (whirles.prototype instanceof _Whirler.WhirlerCore) return whirles;
  const bundle = (0, _dynamicDefinition.createClass)(name, _Whirler.WhirlerBundle);

  function applyMiddleware(middleware) {
    if (!(middleware instanceof Function)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.MIDDLEWARE_FUNCTION);
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