'use strict';

const {WhirlerCore} = require('./Whirler');
const {FormattedError} = require('../error/OtherErrors');
const errorConstants = require('../constants/errorConstants');
const {preCheck} = require('../validation/checkContent');

class Caller {
    constructor(whirlerClass) {
        if(whirlerClass && whirlerClass.prototype instanceof WhirlerCore)
            this.whirler = new whirlerClass();
        else throw new FormattedError(errorConstants.PROVIDED_WHIRLER);
    }

    async call(content) {
        content = preCheck(content);
        return this.whirler.call(content);
    }
}

module.exports = Caller;