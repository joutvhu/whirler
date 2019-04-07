'use strict';

const {FormattedError} = require('../error/OtherErrors');
const {verifyFunctionName} = require('../validation/verifyName');
const ExceptionMessages = require('../constants/ExceptionMessages');
const getAllPropertyNames = require('../utilities/getAllPropertyNames');

function verifyWhirlerFunctions(whirler) {
    let properties = getAllPropertyNames(whirler);
    for (let i of properties) {
        if (i === 'middleware' && !(whirler[i] instanceof Function))
            throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        if (!['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

module.exports = verifyWhirlerFunctions;