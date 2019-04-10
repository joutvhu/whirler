'use strict';

exports.verifyClassName = verifyClassName;
exports.verifyFunctionName = verifyFunctionName;
exports.verifyPropertyName = verifyPropertyName;

var _OtherErrors = require("../error/OtherErrors");

var _ExceptionMessages = require("../constants/ExceptionMessages");

var _RegularExpression = require("../constants/RegularExpression");

function verifyClassName(name) {
  if (typeof name === 'string' && name.length > 0) {
    if (_RegularExpression.default.CLASS_NAME.test(name)) return true;else if (_RegularExpression.default.FIRST_ALPHABETIC.test(name)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.CLASS_NAME_CONTAIN);else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.START_CLASS_NAME);
  } else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SPECIFY_CLASS_NAME);
}

function verifyFunctionName(name) {
  if (typeof name === 'string' && name.length > 0) {
    if (_RegularExpression.default.FUNCTION_NAME.test(name)) return true;else if (_RegularExpression.default.FIRST_LOWERCASE.test(name)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.FUNCTION_NAME_CONTAIN);else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.START_FUNCTION_NAME);
  } else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SPECIFY_FUNCTION_NAME);
}

function verifyPropertyName(name) {
  if (typeof name === 'string' && name.length > 0) {
    if (_RegularExpression.default.PROPERTY_NAME.test(name)) return true;else if (_RegularExpression.default.FIRST_LOWERCASE_OR_UNDERSCORE.test(name)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.PROPERTY_NAME_CONTAIN);else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.START_PROPERTY_NAME);
  } else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SPECIFY_PROPERTY_NAME);
}