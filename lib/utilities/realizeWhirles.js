'use strict';

/**
 * Create a list of Whirler objects from list of Whirler classes.
 *
 * @param whirles is list of Whirler classes
 */
function realizeWhirles(whirles) {
    let result = {};
    for(let i in whirles) result[i] = new whirles[i]();
    return result;
}

module.exports = realizeWhirles;