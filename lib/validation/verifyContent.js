'use strict';

const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const RegularExpression = require('../constants/RegularExpression');
const SystemConstants = require('../constants/SystemConstants');
const {StringType} = require('extension-props');

const ProhibitedNames = [
    ...SystemConstants.SYSTEM_FUNCTIONS,
    'middleware'
];

function verifyGetRequest(content) {
    if (typeof content.getter !== 'string' ||
        !RegularExpression.PUBLIC_PROPERTY_NAME.test(content.getter) ||
        ProhibitedNames.includes(content.getter))
        throw new WhirlerError(WhirlerMessages.INVALID_PROPERTY);
    return content;
}

function verifySetRequest(content) {
    if (typeof content.setter !== 'string' ||
        !RegularExpression.PUBLIC_PROPERTY_NAME.test(content.setter) ||
        ProhibitedNames.includes(content.setter))
        throw new WhirlerError(WhirlerMessages.INVALID_PROPERTY);
    if (content.value === undefined)
        throw new WhirlerError(WhirlerMessages.VALUE_UNDEFINED);
    return content;
}

function verifyCallRequest(content) {
    if (typeof content.function !== 'string' ||
        !RegularExpression.PUBLIC_PROPERTY_NAME.test(content.function) ||
        ProhibitedNames.includes(content.function))
        throw new WhirlerError(WhirlerMessages.INVALID_FUNCTION);
    if (content.arguments && !(content.arguments instanceof Array))
        throw new WhirlerError(WhirlerMessages.INVALID_ARGUMENTS);
    return content;
}

function verifyContent(content) {
    if (!content)
        throw new WhirlerError(WhirlerMessages.INVALID_REQUEST);
    else if (!SystemConstants.TYPES_REQUEST.includes(content.type))
        throw new WhirlerError(WhirlerMessages.REQUEST_TYPE_INVALID);
}

function verifyNamespace(nsp) {
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

function verifyByType(type, content) {
    switch (type) {
        case SystemConstants.GET_REQUEST:
            verifyGetRequest(content);
            break;
        case SystemConstants.SET_REQUEST:
            verifySetRequest(content);
            break;
        case SystemConstants.CALL_REQUEST:
            verifyCallRequest(content);
            break;
        default:
            throw new WhirlerError(WhirlerMessages.REQUEST_TYPE_INVALID);
    }
}

function firstVerify(type, content) {
    verifyContent(content);
    if (content.namespace)
        content.namespace = verifyNamespace(content.namespace);
    verifyByType(type, content);

    return content;
}

function verifyAgain(type, content) {
    verifyByType(type, content);

    return content;
}

function verifyFunction(content) {
    if ((content.namespace && content.namespace.length > 0) ||
        !(this[content.function] instanceof Function))
        throw new WhirlerError(WhirlerMessages.FUNCTION_NOT_EXIST);
}

module.exports = {
    verifyContent,
    firstVerify,
    verifyAgain,
    verifyFunction
};
