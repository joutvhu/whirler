'use strict';

function realizeWhirles(whirles) {
    let result = {};
    for(let i in whirles) result[i] = new whirles[i]();
    return result;
}

module.exports = realizeWhirles;