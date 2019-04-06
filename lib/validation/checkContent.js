'use strict';

const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const RegularExpression = require('../constants/RegularExpression');

const prohibitedNames = ['constructor', 'call', 'middleware'];

function checkNamespace(nsp) {
    if (nsp instanceof Array && nsp.length > 0) {
        if (nsp.every(value => RegularExpression.CLASS_NAME.test(value)))
            return nsp;
        else throw new WhirlerError(WhirlerMessages.INVALID_NAMESPACE);
    } else if (typeof nsp === 'string' && nsp.length > 0) {
        if (RegularExpression.NAMESPACE.test(nsp))
            return nsp.split('.');
        else throw new WhirlerError(WhirlerMessages.INVALID_NAMESPACE);
    }
    return undefined;
}

function verifyArguments(content) {
    if (content.arguments && !(content.arguments instanceof Array))
        throw new WhirlerError(WhirlerMessages.INVALID_ARGUMENTS);
}

function preCheck(content) {
    if (!content)
        throw new WhirlerError(WhirlerMessages.INVALID_REQUEST);
    if (content.namespace)
        content.namespace = checkNamespace(content.namespace);
    if (typeof content.function !== 'string' ||
        !RegularExpression.FUNCTION_NAME.test(content.function) ||
        prohibitedNames.includes(content.function))
        throw new WhirlerError(WhirlerMessages.INVALID_FUNCTION);
    verifyArguments(content);
    return content;
}

function verifyFunction(content) {
    if ((content.namespace && content.namespace.length > 0) ||
        !(this[content.function] instanceof Function))
        throw new WhirlerError(WhirlerMessages.FUNCTION_NOT_EXIST);
}

module.exports = {
    preCheck,
    verifyArguments,
    verifyFunction
};