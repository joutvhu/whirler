'use strict';

const {WhirlerCore} = require('../type/Whirler');
const {FormattedError, DuplicationError} = require('../error/OtherErrors');
const errorConstants = require('../constants/errorConstants');
const verifyWhirles = require('../validation/verifyWhirles');

function convertWhirlerArray(whirles) {
    let result = {};

    if (whirles.length === 0) throw new FormattedError(errorConstants.PROVIDE_WHIRLERS);
    else if (whirles.length === 1) {
        if(whirles[0].prototype instanceof WhirlerCore)
            return whirles[0];
        else throw new FormattedError(errorConstants.SURE_WHIRLER);
    }
    for(let i of whirles) {
        if(i.prototype instanceof WhirlerCore && i.name) {
            if (result[i.name] == undefined)
                result[i.name] = i;
            else throw new DuplicationError(errorConstants.DUPLICATE_WHIRLER.replace('[WhirlerName]', i.name));
        } else throw new FormattedError(errorConstants.SURE_WHIRLER);
    }

    return result;
}

function convertWhirles(whirles) {
    if(whirles.length === 1) {
        if(whirles[0] instanceof Array)
            whirles = convertWhirlerArray(whirles[0]);
        else whirles = verifyWhirles(whirles[0]);
    } else whirles = convertWhirlerArray(whirles);

    return whirles;
}

module.exports = convertWhirles;