'use strict';

const WhirlerError = require('../error/WhirlerError');
const {verifyFunction, verifyArguments} = require('../validation/checkContent');
const {preventOverrideFunction, preventOverrideClass} = require('../validation/preventOverride');
const WhirlerMessages = require('../constants/WhirlerMessages');
const realizeWhirles = require('../utilities/realizeWhirles');
const verifyWhirlerFunctions = require('../validation/verifyWhirlerFunctions');
const {verifyClassName} = require('../validation/verifyName');

const notOverride = ['call', 'get', 'set'];

class WhirlerCore {
    constructor() {
        preventOverrideClass(WhirlerCore, this, [Whirler, WhirlerBundle]);
        verifyClassName(this.constructor.name);
    }

    call(content) {
        if (content) {
            if (this.middleware instanceof Function) {
                const backup = {function: content.function};
                if (content.namespace instanceof Array && content.namespace.length > 0)
                    backup.namespace = [...content.namespace];
                content = this.middleware(content);
                if (!content) content = backup;
                else {
                    content.function = backup.function;
                    if (backup.namespace) content.namespace = backup.namespace;
                }
            }
            if (content.stop)
                throw new WhirlerError(WhirlerMessages.FORCED_STOP);
        } else throw new WhirlerError(WhirlerMessages.INVALID_REQUEST);

        return content;
    }
}

class Whirler extends WhirlerCore {
    constructor() {
        super();

        preventOverrideFunction(Whirler, notOverride, this);
        verifyWhirlerFunctions(this);
    }

    async call(content) {
        content = super.call(content);

        verifyFunction.call(this, content);
        verifyArguments(content);

        if (content.arguments instanceof Array)
            return this[content.function](...content.arguments);
        else return this[content.function]();
    }
}

class WhirlerBundle extends WhirlerCore {
    constructor() {
        super();

        this.__packages = realizeWhirles(this.__whirles);
    }

    async call(content) {
        content = super.call(content);

        if (content.namespace instanceof Array && content.namespace.length > 0) {
            const nsp = content.namespace.shift();
            if (typeof nsp === 'string' && this.__packages[nsp] instanceof WhirlerCore)
                return this.__packages[nsp].call(content);
        }
        throw new WhirlerError(WhirlerMessages.FUNCTION_NOT_EXIST);
    }
}

module.exports = {
    WhirlerCore,
    Whirler,
    WhirlerBundle
};
