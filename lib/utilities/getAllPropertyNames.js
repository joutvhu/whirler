'use strict';

function getOwnPropertyNames(obj) {
    let result = [], temp;
    try {
        while (obj && obj.constructor !== Object) {
            temp = Object.getOwnPropertyNames(obj);
            for (let i of temp) {
                if (!result.includes(i))
                    result.push(i);
            }

            obj = Object.getPrototypeOf(obj);
        }
    } catch (e) {
        // continue regardless of error
    }
    return result;
}

module.exports = getOwnPropertyNames;