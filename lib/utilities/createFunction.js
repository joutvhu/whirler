'use strict';

function createFunction(name, prototype) {
    eval('var temp = function ' + name + '() { return prototype.apply(this, arguments); }');
    return temp;
}

module.exports = createFunction;