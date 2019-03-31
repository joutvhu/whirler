const WhirlerError = require('../error/WhirlerError');
const errorConstants = require('../constants/errorConstants');

const prohibitedNames = ['constructor', 'call', 'middleware'];

function checkContent(content) {
    if(typeof content.function !== 'string' || prohibitedNames.includes(content.function))
        throw new WhirlerError(errorConstants.INVALID_FUNCTION);
    if(content.function.startsWith('__') || !(this[content.function] instanceof Function))
        throw new WhirlerError(errorConstants.FUNCTION_NOT_EXIST);
    return true;
}

module.exports = checkContent;