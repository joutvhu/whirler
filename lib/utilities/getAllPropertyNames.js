'use strict';
/**
 * Return all property names of a object.
 *
 * @param obj
 * @returns {Array}
 */

exports.default = getAllPropertyNames;

function getAllPropertyNames(obj) {
  const result = [];
  let i;
  let temp;

  if (obj) {
    if (obj.constructor === {}.constructor) return Object.getOwnPropertyNames(obj);

    try {
      while (obj.constructor !== Object) {
        temp = Object.getOwnPropertyNames(obj);

        for (i of temp) {
          if (i !== 'constructor' && !result.includes(i)) result.push(i);
        }

        obj = Object.getPrototypeOf(obj);
      }
    } catch (e) {// continue regardless of error
    }
  }

  return result;
}