'use strict';

const {WhirlerCore} = require('./Whirler');
const {FormattedError} = require('../error/OtherErrors');
const ExceptionMessages = require('../constants/ExceptionMessages');
const {preCheck} = require('../validation/checkContent');

class Caller {
    constructor(whirlerClass) {
        if (whirlerClass && whirlerClass.prototype instanceof WhirlerCore)
            this.whirler = new whirlerClass();
        else throw new FormattedError(ExceptionMessages.PROVIDED_WHIRLER);
    }

    async call(content) {
        const _content = preCheck(content);
        return this.whirler.call(_content);
    }
}

module.exports = Caller;
