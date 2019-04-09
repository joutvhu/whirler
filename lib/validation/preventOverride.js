'use strict';

const {OverridingError} = require('../error/OtherErrors');
const ExceptionMessages = require('../constants/ExceptionMessages');

function preventOverrideClass(sighClass, sighObj, except) {
    let i;

    if (sighObj && sighObj['__proto__'] instanceof sighClass) {
        let error = true;
        if (except) {
            for (i of except) {
                if (sighObj instanceof i) {
                    error = false;
                    break;
                }
            }
        }
        if (error) throw new OverridingError(ExceptionMessages.OVERRIDE_CLASS.replace('[ClassName]', sighClass.name));
    }
}

function preventOverrideFunction(sighClass, functions, sighObj) {
    let obj = sighObj;
    let i;

    while (obj instanceof sighClass) {
        for (i of functions) {
            if (typeof i === 'string' && obj.hasOwnProperty(i))
                throw new OverridingError(ExceptionMessages.OVERRIDE_FUNCTION.replace('[FunctionName]', i)
                    .replace('[ClassName]', sighClass.name));
        }

        if (sighObj['__proto__']) obj = obj['__proto__'];
        else break;
    }
}

module.exports = {
    preventOverrideClass,
    preventOverrideFunction
};
