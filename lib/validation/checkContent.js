'use strict';

const WhirlerError = require('../error/WhirlerError');
const whirlerConstants = require('../constants/whirlerConstants');
const regexConstants = require('../constants/regexConstants');

const prohibitedNames = ['constructor', 'call', 'middleware'];

function checkNamespace(nsp) {
    if (nsp instanceof Array && nsp.length > 0) {
        if (nsp.every(value => regexConstants.CLASS_NAME.test(value)))
            return nsp;
        else throw new WhirlerError(whirlerConstants.INVALID_NAMESPACE);
    } else if (typeof nsp === 'string' && nsp.length > 0) {
        if (regexConstants.NAMESPACE.test(nsp))
            return nsp.split('.');
        else throw new WhirlerError(whirlerConstants.INVALID_NAMESPACE);
    }
    return undefined;
}

function verifyArguments(content) {
    if (content.arguments && !(content.arguments instanceof Array))
        throw new WhirlerError(whirlerConstants.INVALID_ARGUMENTS);
}

function preCheck(content) {
    if (!content)
        throw new WhirlerError(whirlerConstants.INVALID_REQUEST);
    if (content.namespace)
        content.namespace = checkNamespace(content.namespace);
    if (typeof content.function !== 'string' ||
        !regexConstants.FUNCTION_NAME.test(content.function) ||
        prohibitedNames.includes(content.function))
        throw new WhirlerError(whirlerConstants.INVALID_FUNCTION);
    verifyArguments(content);
    return content;
}

function verifyFunction(content) {
    if ((content.namespace && content.namespace.length > 0) ||
        !(this[content.function] instanceof Function))
        throw new WhirlerError(whirlerConstants.FUNCTION_NOT_EXIST);
}

module.exports = {
    preCheck,
    verifyArguments,
    verifyFunction
};