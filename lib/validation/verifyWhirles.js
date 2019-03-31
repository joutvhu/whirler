'use strict';

const {WhirlerCore} = require('../type/Whirler');

function verifyWhirles(whirles) {
    if (typeof whirles === 'object' && whirles.constructor === undefined) {
        let len = 0;
        for (let i in whirles) {
            if (!(whirles[i] instanceof WhirlerCore))
                throw new Error('Item ' + i + ' is invalid.');
            len++;
        }
        if (len === 0) throw new Error('Don\'t have item.');
        return len;
    } else throw new Error('The parameter is invalid.');
}

module.exports = verifyWhirles;