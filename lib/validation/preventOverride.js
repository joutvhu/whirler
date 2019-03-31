'use strict';

function preventOverrideClass(sighClass, sighObj, except) {
    if (sighObj != null && sighObj['__proto__'] instanceof sighClass) {
        let error = true;
        if(except) {
            for (let i of except) {
                if (sighObj instanceof i) {
                    error = false;
                    break;
                }
            }
        }
        if(error) throw new Error('You can\'t override the ' + sighClass.name + ' class.');
    }
}

function preventOverrideFunction(sighClass, functions, sighObj) {
    let obj = sighObj;

    while (obj instanceof sighClass) {
        for (let i of functions) {
            if (typeof i === 'string' && obj.hasOwnProperty(i))
                throw new Error('You can\'t override the ' + i +
                    ' in any subclasses of the ' + sighClass.name + ' class.');
        }

        if (sighObj['__proto__'] != null)
            obj = obj['__proto__'];
        else break;
    }
}

module.exports = {
    preventOverrideClass,
    preventOverrideFunction
};