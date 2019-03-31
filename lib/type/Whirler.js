'use strict';

const checkContent = require('../validation/checkContent');
const {preventOverrideFunction, preventOverrideClass} = require('../validation/preventOverride');

const notOverride = ['call'];

class WhirlerCore {
    constructor() {
        preventOverrideClass(WhirlerCore, this, [Whirler,  WhirlerBundle]);
    }

    call(content) {
        if (checkContent.call(this, content)) {
            if (this.middleware instanceof Function) {
                content = this.middleware(content);
                checkContent.call(this, content);
            }

            return content;
        }
    }
}

class Whirler extends WhirlerCore {
    constructor() {
        super();
        preventOverrideFunction(Whirler, notOverride, this);
    }

    async call(content) {
        content = super.call(content);

        if (content) {
            if (content.arguments instanceof Array)
                return this[content.function](...content.arguments);
            else return this[content.function]();
        }
    }
}

class WhirlerBundle extends WhirlerCore {
    async call(content) {
        content = super.call(content);

        if(content.namespace instanceof Array && content.namespace.length > 0) {
            let nsp = content.namespace.shift();
            if (typeof nsp === 'string' && this.__whirles[nsp])
                return this.__whirles[nsp].call(content);
        }
    }
}

module.exports = {
    WhirlerCore,
    Whirler,
    WhirlerBundle
};