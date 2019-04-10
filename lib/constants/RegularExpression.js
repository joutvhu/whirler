'use strict';

exports.default = void 0;
var _default = {
  CLASS_NAME: /^[a-z][a-z0-9_]*$/i,
  FIRST_ALPHABETIC: /^[a-z]/i,
  FIRST_LOWERCASE: /^[a-z]/,
  FIRST_LOWERCASE_OR_UNDERSCORE: /^[a-z_]/,
  FUNCTION_NAME: /^[a-z][a-zA-Z0-9_]*$/,
  NAMESPACE: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/i,
  PROPERTY_NAME: /^[a-z_][a-zA-Z0-9_]*$/,
  SYSTEM_FUNCTION: ['call', 'get', 'set']
};
exports.default = _default;