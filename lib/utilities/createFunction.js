'use strict';

/**
 * Create a function with dynamic name.
 *
 * @param name of the function
 * @param prototype is function body
 * @returns {*}
 */
function createFunction(name, prototype) {
    let temp = undefined;
    eval('temp = function ' + name + '() { return prototype.apply(this, arguments); }');
    return temp;
}

module.exports = createFunction;