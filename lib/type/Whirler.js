'use strict';

const SystemConstants = require('../constants/SystemConstants');
const WhirlerError = require('../error/WhirlerError');
const ExceptionMessages = require('../constants/ExceptionMessages');
const WhirlerMessages = require('../constants/WhirlerMessages');
const {ClassType, ObjectType, FunctionType, StringType} = require('extension-props');
const {verifyAgain, verifyContent, verifyFunction} = require('../validation/verifyContent');
const {verifyClassName} = require('../validation/verifyName');
const {verifyWhirlerProperties} = require('../validation/verifyWhirler');

class WhirlerCore {
    constructor() {
        ClassType.preventOverrideClass(this, WhirlerCore, [Whirler, WhirlerBundle]);
        verifyClassName(this.constructor.name);
    }

    call(content, type) {
        if (content) {
            if (FunctionType.isCallable(this.middleware)) {
                this.middleware(content);

                verifyContent(content);
                if (content.stopped) throw new WhirlerError(WhirlerMessages.FORCED_STOP);
                else verifyAgain(type, content);
            }

            return content;
        } else throw new WhirlerError(WhirlerMessages.INVALID_REQUEST);
    }
}

class Whirler extends WhirlerCore {
    constructor() {
        super();

        ClassType.preventOverrideFunction(this, Whirler, SystemConstants.TYPES_REQUEST);
        verifyWhirlerProperties(this);
    }

    async get(content) {
        content = super.call(content, SystemConstants.GET_REQUEST);

        if (!content.namespace || content.namespace.length === 0) {
            const descriptor = ObjectType.getAllPropertyDescriptor(this, content.getter);
            if (descriptor !== undefined) {
                if (descriptor.get != undefined || !(descriptor.value instanceof Function)) {
                    return this[content.getter];
                }
            }
        }
        throw new WhirlerError(WhirlerMessages.PROPERTY_NOT_EXIST);
    }

    async set(content) {
        content = super.call(content, SystemConstants.SET_REQUEST);

        if (!content.namespace || content.namespace.length === 0) {
            const descriptor = ObjectType.getAllPropertyDescriptor(this, content.setter);
            if (descriptor !== undefined) {
                if (descriptor.set != undefined || (!(descriptor.value instanceof Function) && descriptor.writable)) {
                    this[content.setter] = content.value;
                    if (descriptor.get != undefined || descriptor.value != undefined)
                        return this[content.setter];
                    else return content.value;
                }
            }
        }
        throw new WhirlerError(WhirlerMessages.PROPERTY_NOT_EXIST);
    }

    async call(content) {
        content = super.call(content, SystemConstants.CALL_REQUEST);

        verifyFunction.call(this, content);

        if (content.args instanceof Array)
            return this[content.function](...content.args);
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

        if (this.__whirles.constructor === {}.constructor) {
            let i;
            let e = true;
            this.__packages = {};

            for (i in this.__whirles) {
                if (ClassType.valueOf(this.__whirles[i]).subclassOf(WhirlerCore)) {
                    this.__packages[i] = new this.__whirles[i]();
                    e = false;
                }
            }
            if (e) throw new Error(StringType.replacePlaceholders(ExceptionMessages.BUNDLE_NO_WHIRLER, {
                BUNDLENAME: this.constructor.name
            }));
        }
        throw new Error(StringType.replacePlaceholders(ExceptionMessages.WHIRLES_INVALID, {
            BUNDLENAME: this.constructor.name
        }));
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
