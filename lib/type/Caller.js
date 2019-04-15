'use strict';

const {WhirlerCore} = require('./Whirler');
const {FormattedError} = require('../error/OtherErrors');
const ExceptionMessages = require('../constants/ExceptionMessages');
const SystemConstants = require('../constants/SystemConstants');
const {firstVerify} = require('../validation/verifyContent');

class Caller {
    constructor(whirlerClass) {
        if (whirlerClass && whirlerClass.prototype instanceof WhirlerCore)
            this.whirler = new whirlerClass();
        else throw new FormattedError(ExceptionMessages.PROVIDED_WHIRLER);
    }

    async get(content) {
        return this.whirler.get(firstVerify(SystemConstants.GET_REQUEST, content));
    }

    async set(content) {
        return this.whirler.set(firstVerify(SystemConstants.SET_REQUEST, content));
    }

    async call(content) {
        return this.whirler.call(firstVerify(SystemConstants.CALL_REQUEST, content));
    }
}

module.exports = Caller;
