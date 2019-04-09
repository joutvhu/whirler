'use strict';

const {WhirlerCore} = require('../type/Whirler');
const {FormattedError, DuplicationError} = require('../error/OtherErrors');
const ExceptionMessages = require('../constants/ExceptionMessages');
const {verifyClassName} = require('../validation/verifyName');

function convertWhirlerMap(whirles) {
    let i;

    if (whirles.constructor === {}.constructor) {
        for (i in whirles) {
            if (Object.hasOwnProperty.call(whirles, i)) {
                verifyClassName(i);
                if (!(whirles[i].prototype instanceof WhirlerCore))
                    throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
            }
        }
        const keys = Object.keys(whirles);

        if (keys.length === 0) throw new FormattedError(ExceptionMessages.PROVIDE_WHIRLERS);
        else if (keys.length === 1) return whirles[keys[0]];
        else return whirles;
    } else throw new FormattedError(ExceptionMessages.INVALID_PARAMETER);
}

function convertWhirlerArray(whirles) {
    const result = {};
    let i;

    if (whirles.length === 0) throw new FormattedError(ExceptionMessages.PROVIDE_WHIRLERS);
    else if (whirles.length === 1) {
        if (whirles[0].prototype instanceof WhirlerCore)
            return whirles[0];
        else throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
    }
    for (i of whirles) {
        if (i.prototype instanceof WhirlerCore && i.name) {
            if (!result[i.name])
                result[i.name] = i;
            else throw new DuplicationError(ExceptionMessages.DUPLICATE_WHIRLER.replace('[WhirlerName]', i.name));
        } else throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
    }

    return result;
}

function convertWhirles(whirles) {
    if (whirles.length === 1) {
        if (whirles[0] instanceof Array)
            whirles = convertWhirlerArray(whirles[0]);
        else whirles = convertWhirlerMap(whirles[0]);
    } else whirles = convertWhirlerArray(whirles);

    return whirles;
}

module.exports = {
    convertWhirles,
    convertWhirlerArray,
    convertWhirlerMap
};
