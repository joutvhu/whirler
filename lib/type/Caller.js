'use strict';

const {WhirlerCore} = require('./Whirler');
const {preCheck} = require('../validation/checkContent');

class Caller {
    constructor(whirlerClass) {
        if(whirlerClass && whirlerClass.prototype instanceof WhirlerCore)
            this.whirler = new whirlerClass();
        else throw Error('The Whirler is invalid.');
    }

    async call(content) {
        content = preCheck(content);
        return this.whirler.call(content);
    }
}

module.exports = Caller;