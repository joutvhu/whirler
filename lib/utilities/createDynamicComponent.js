'use strict';

/**
 * Create a function with dynamic name.
 *
 * @param name of the function
 * @param prototype is function body
 * @returns {*}
 */
function createFunction(name, prototype) {
    let temp = prototype;
    eval('temp = function ' + name + '() { return prototype.apply(this, arguments); }');
    return temp;
}

function createClass(name, superClass) {
    let temp = superClass;
    eval('temp = class ' + name + ' extends superClass {\n' +
        '    constructor() {\n' +
        '        super();\n' +
        '    }\n' +
        '}');
    return temp;
}

module.exports = {
    createFunction,
    createClass
};