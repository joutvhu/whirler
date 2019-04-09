'use strict';

function getAllPropertyNames(obj) {
    const result = [];
    let i;
    let temp;

    try {
        while (obj && obj.constructor !== Object) {
            temp = Object.getOwnPropertyNames(obj);
            for (i of temp) {
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

module.exports = getAllPropertyNames;
