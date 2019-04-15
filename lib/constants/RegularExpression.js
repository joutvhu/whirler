'use strict';

module.exports = {
    CLASS_NAME: /^[a-z][a-z0-9_]*$/i,
    NAMESPACE: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/i,
    FIRST_ALPHABETIC: /^[a-z]/i,
    FIRST_LOWERCASE: /^[a-z]/,
    FIRST_LOWERCASE_OR_UNDERSCORE: /^[a-z_]/,
    PUBLIC_PROPERTY_NAME: /^[a-z][a-zA-Z0-9_]*$/,
    PRIVATE_PROPERTY_NAME: /^_[a-zA-Z0-9_]*$/,
    PROPERTY_NAME: /^[a-z_][a-zA-Z0-9_]*$/
};
