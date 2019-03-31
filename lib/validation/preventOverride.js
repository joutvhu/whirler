'use strict';

function preventOverride(sighClass, properties, sighObj) {
    if (sighObj['__proto__'] != null) {
        let obj = sighObj['__proto__'];

        while (obj instanceof sighClass) {
            for (let i of properties) {
                if (typeof i === 'string' && obj.hasOwnProperty(i))
                    throw new Error('You can\'t override the ' + i +
                        ' in any subclasses of the ' + sighClass.name + ' class.');
            }
            obj = obj['__proto__'];
        }
    }
}

module.exports = preventOverride;