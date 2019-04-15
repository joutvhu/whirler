'use strict';

const ExceptionMessages = require('../constants/ExceptionMessages');
const SystemConstants = require('../constants/SystemConstants');
const {FormattedError} = require('../error/OtherErrors');
const {FunctionType, ObjectType} = require('extension-props');
const {verifyFunctionName, verifyPropertyName} = require('./verifyName');

function verifyMiddleware(middleware) {
    if (!FunctionType.isSyncFunction(middleware))
        throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
    return true;
}

function verifyWhirlerFunctions(whirler) {
    const properties = ObjectType.getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware')
            verifyMiddleware(whirler[i]);
        if (!SystemConstants.SYSTEM_FUNCTIONS.includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

function verifyWhirlerProperties(whirler) {
    const properties = ObjectType.getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware')
            verifyMiddleware(whirler[i]);
        else if (!SystemConstants.SYSTEM_FUNCTIONS.includes(i))
            verifyPropertyName(i);
    }
}

module.exports = {
    verifyMiddleware,
    verifyWhirlerFunctions,
    verifyWhirlerProperties
};
