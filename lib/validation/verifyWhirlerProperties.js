'use strict';

const {FormattedError} = require('../error/OtherErrors');
const {verifyFunctionName, verifyPropertyName} = require('../validation/verifyName');
const ExceptionMessages = require('../constants/ExceptionMessages');
const RegularExpression = require('../constants/RegularExpression');
const getAllPropertyNames = require('../utilities/getAllPropertyNames');

function verifyWhirlerFunctions(whirler) {
    const properties = getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware' && !(whirler[i] instanceof Function))
            throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        if (!['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

function verifyWhirlerProperties(whirler) {
    const properties = getAllPropertyNames(whirler);
    let i;

    for (i of properties) {
        if (i === 'middleware') {
            if (!(whirler[i] instanceof Function))
                throw new FormattedError(ExceptionMessages.MIDDLEWARE_FUNCTION);
        } else if (!RegularExpression.SYSTEM_FUNCTION.includes(i))
            verifyPropertyName(i);
    }
}

module.exports = {
    verifyWhirlerFunctions,
    verifyWhirlerProperties
};
