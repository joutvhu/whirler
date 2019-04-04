'use strict';

function createWhirlerClass(name, superClass) {
    let temp = undefined;
    eval('temp = class ' + name + ' extends superClass {\n' +
        '    constructor() {\n' +
        '        super();\n' +
        '    }\n' +
        '}');
    return temp;
}

module.exports = createWhirlerClass;