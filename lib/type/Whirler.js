'use strict';

const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const SystemConstants = require('../constants/SystemConstants');
const realizeWhirles = require('../utilities/realizeWhirles');
const {ClassType, ObjectType} = require('extension-props');
const {verifyFunction, verifyAgain, verifyContent} = require('../validation/verifyContent');
const {verifyClassName} = require('../validation/verifyName');
const {verifyWhirlerProperties} = require('../validation/verifyWhirler');

class WhirlerCore {
    constructor() {
        ClassType.preventOverrideClass(this, WhirlerCore, [Whirler, WhirlerBundle]);
        verifyClassName(this.constructor.name);
    }

    call(content, type) {
        if (content) {
            if (this.middleware instanceof Function) {
                content = this.middleware(content);

                verifyContent(content);
                if (content.stop) throw new WhirlerError(WhirlerMessages.FORCED_STOP);
                else verifyAgain(type || content.type, content);
            }

            return content;
        } else throw new WhirlerError(WhirlerMessages.INVALID_REQUEST);
    }
}

class Whirler extends WhirlerCore {
    constructor() {
        super();

        ClassType.preventOverrideFunction(this, Whirler, SystemConstants.SYSTEM_FUNCTIONS);
        verifyWhirlerProperties(this);
    }

    async get(content) {
        content = super.call(content, SystemConstants.GET_REQUEST);

        const descriptor = ObjectType.getAllPropertyDescriptor(this, content.getter);
        if (descriptor !== undefined) {
            if(descriptor.get != undefined || !(descriptor.value instanceof Function)) {
                return this[content.getter];
            }
        }
    }

    async set(content) {
        content = super.call(content, SystemConstants.SET_REQUEST);

        const descriptor = ObjectType.getAllPropertyDescriptor(this, content.setter);
        if (descriptor !== undefined) {
            if(descriptor.set != undefined || (!(descriptor.value instanceof Function) && descriptor.writable)) {
                this[content.setter] = content.value;
                if(descriptor.get != undefined || descriptor.value != undefined)
                    return this[content.setter];
                else return content.value;
            }
        }
    }

    async call(content) {
        content = super.call(content, SystemConstants.CALL_REQUEST);

        verifyFunction.call(this, content);

        if (content.arguments instanceof Array)
            return this[content.function](...content.arguments);
        else return this[content.function]();
    }
}

function transferPower(type, packages, content) {
    if (content.namespace instanceof Array && content.namespace.length > 0) {
        const nsp = content.namespace.shift();
        if (typeof nsp === 'string' && packages[nsp] instanceof WhirlerCore)
            return packages[nsp];
    }

    if (type === SystemConstants.CALL_REQUEST && content.function)
        throw new WhirlerError(WhirlerMessages.FUNCTION_NOT_EXIST);
    else throw new WhirlerError(WhirlerMessages.PROPERTY_NOT_EXIST);
}

class WhirlerBundle extends WhirlerCore {
    constructor() {
        super();

        this.__packages = realizeWhirles(this.__whirles);
    }

    async get(content) {
        content = super.call(content, SystemConstants.GET_REQUEST);
        return transferPower(SystemConstants.GET_REQUEST, this.__packages, content)
            .get(content);
    }

    async set(content) {
        content = super.call(content, SystemConstants.SET_REQUEST);
        return transferPower(SystemConstants.SET_REQUEST, this.__packages, content)
            .set(content);
    }

    async call(content) {
        content = super.call(content, SystemConstants.CALL_REQUEST);
        return transferPower(SystemConstants.CALL_REQUEST, this.__packages, content)
            .call(content);
    }
}

module.exports = {
    WhirlerCore,
    Whirler,
    WhirlerBundle
};
