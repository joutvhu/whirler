'use strict';

const {WhirlerCore} = require('../type/Whirler');
const {FormattedError} = require('../error/OtherErrors');
const errorConstants = require('../constants/errorConstants');

function verifyWhirles(whirles) {
    if (typeof whirles === 'object' && whirles.constructor === undefined) {
        let len = 0;
        for (let i in whirles) {
            if (!(whirles[i] instanceof WhirlerCore))
                throw new FormattedError('Item ' + i + ' is invalid.');
            len++;
        }
        if (len === 0) throw new FormattedError('Don\'t have item.');
        return len;
    } else throw new FormattedError('The parameter is invalid.');
}

module.exports = verifyWhirles;