'use strict';

const {FormattedError} = require('../error/OtherErrors');
const {verifyFunctionName} = require('../validation/verifyName');
const errorConstants = require('../constants/errorConstants');
const getOwnPropertyNames = require('../utilities/getAllPropertyNames');

function verifyWhirlerFunctions(whirler) {
    let properties = getOwnPropertyNames(whirler);
    for (let i of properties) {
        if (i === 'middleware' && !(whirler[i] instanceof Function))
            throw new FormattedError(errorConstants.MIDDLEWARE_FUNCTION);
        if (['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

module.exports = verifyWhirlerFunctions;