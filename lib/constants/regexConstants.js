'use strict';

module.exports = {
    NAMESPACE: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/i,
    CLASS_NAME: /^[a-z][a-z0-9_]*$/i,
    FUNCTION_NAME: /^[a-z][a-zA-Z0-9_]*$/,
    FIRST_ALPHABETIC: /^[a-z]/i,
    FIRST_LOWERCASE: /^[a-z]/
};