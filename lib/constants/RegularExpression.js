'use strict';

module.exports = {
    CLASS_NAME: /^[a-z][a-z0-9_]*$/i,
    FIRST_ALPHABETIC: /^[a-z]/i,
    FIRST_LOWERCASE: /^[a-z]/,
    FUNCTION_NAME: /^[a-z][a-zA-Z0-9_]*$/,
    NAMESPACE: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/i
};
