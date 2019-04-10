'use strict';

exports.verifyArguments = verifyArguments;
exports.preCheck = preCheck;
exports.verifyFunction = verifyFunction;

var _WhirlerError = require("../error/WhirlerError");

var _WhirlerMessages = require("../constants/WhirlerMessages");

var _RegularExpression = require("../constants/RegularExpression");

const prohibitedNames = ['constructor', 'call', 'middleware'];

function checkNamespace(nsp) {
  if (nsp instanceof Array && nsp.length > 0) {
    if (nsp.every(value => _RegularExpression.default.CLASS_NAME.test(value))) return nsp;else throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_NAMESPACE);
  } else if (typeof nsp === 'string' && nsp.length > 0) {
    if (_RegularExpression.default.NAMESPACE.test(nsp)) return nsp.split('.');else throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_NAMESPACE);
  }

  return undefined;
}

function verifyArguments(content) {
  if (content.arguments && !(content.arguments instanceof Array)) throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_ARGUMENTS);
}

function preCheck(content) {
  if (!content) throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_REQUEST);
  if (content.namespace) content.namespace = checkNamespace(content.namespace);
  if (typeof content.function !== 'string' || !_RegularExpression.default.FUNCTION_NAME.test(content.function) || prohibitedNames.includes(content.function)) throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_FUNCTION);
  verifyArguments(content);
  return content;
}

function verifyFunction(content) {
  if (content.namespace && content.namespace.length > 0 || !(this[content.function] instanceof Function)) throw new _WhirlerError.default(_WhirlerMessages.default.FUNCTION_NOT_EXIST);
}