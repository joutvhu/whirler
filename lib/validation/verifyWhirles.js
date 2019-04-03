'use strict';

const {WhirlerCore} = require('../type/Whirler');
const {FormattedError} = require('../error/OtherErrors');
const {verifyClassName, verifyFunctionName} = require('../validation/verifyName');
const errorConstants = require('../constants/errorConstants');
const getOwnPropertyNames = require('../utilities/getAllPropertyNames');

function verifyWhirles(whirles) {
    if (whirles.constructor === {}.constructor) {
        for (let i in whirles) {
            verifyClassName(i);
            if (!(whirles[i].prototype instanceof WhirlerCore))
                throw new FormattedError(errorConstants.SURE_WHIRLER);
        }
        let keys = Object.keys(whirles);
        if (keys.length === 0) throw new FormattedError(errorConstants.PROVIDE_WHIRLERS);
        else if (keys.length === 1) return whirles[keys[0]];
        else return whirles;
    } else throw new FormattedError(errorConstants.INVALID_PARAMETER);
}

function verifyWhirlerFunctions(whirler) {
    let properties = getOwnPropertyNames(whirler);
    for (let i of properties) {
        if (['constructor', 'call', 'middleware'].includes(i) && whirler[i] instanceof Function)
            verifyFunctionName(i);
    }
}

module.exports = {
    verifyWhirles,
    verifyWhirlerFunctions
};