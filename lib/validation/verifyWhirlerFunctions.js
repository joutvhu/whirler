'use strict';

exports.default = verifyWhirlerFunctions;

var _OtherErrors = require("../error/OtherErrors");

var _verifyName = require("./verifyName");

var _ExceptionMessages = require("../constants/ExceptionMessages");

var _getAllPropertyNames = require("../utilities/getAllPropertyNames");

function verifyWhirlerFunctions(whirler) {
  const properties = (0, _getAllPropertyNames.default)(whirler);
  let i;

  for (i of properties) {
    if (i === 'middleware' && !(whirler[i] instanceof Function)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.MIDDLEWARE_FUNCTION);
    if (!['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function) (0, _verifyName.verifyFunctionName)(i);
  }
}