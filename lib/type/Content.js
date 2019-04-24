'use strict';

const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const SystemConstants = require('../constants/SystemConstants');
const {verifyFunctionName, verifyPropertyName} = require('../validation/verifyName');

class Content {
    constructor(type, name, values) {
        if (!SystemConstants.TYPES_REQUEST.includes(type))
            throw new WhirlerError(WhirlerMessages.REQUEST_TYPE_INVALID);
        if(type === SystemConstants.CALL_REQUEST)
            verifyFunctionName(name);
        else verifyPropertyName(name);

        Object.defineProperty(this, '__type', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: type
        });
        Object.defineProperty(this, '__name', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: name
        });
        this.__values = values;
    }

    get type() {
        return this.__type;
    }

    get function() {
        if (this.__type === SystemConstants.CALL_REQUEST)
            return this.__name;
        else return undefined;
    }

    get getter() {
        if (this.__type === SystemConstants.GET_REQUEST)
            return this.__name;
        else return undefined;
    }

    get setter() {
        if (this.__type === SystemConstants.SET_REQUEST)
            return this.__name;
        else return undefined;
    }

    get value() {
        if (this.__type === SystemConstants.SET_REQUEST)
            return this.__values;
        else return undefined;
    }

    set value(v) {
        if (this.__type === SystemConstants.SET_REQUEST)
            this.__values = v;
    }

    get args() {
        if (this.__type === SystemConstants.CALL_REQUEST && this.__values instanceof Array)
            return this.__values;
        else return undefined;
    }

    set args(v) {
        if (this.__type === SystemConstants.CALL_REQUEST && (v === undefined || v instanceof Array))
            this.__values = v;
    }

    set values(v) {
        if ((this.__type === SystemConstants.CALL_REQUEST && (v === undefined || v instanceof Array)) ||
            (this.__type === SystemConstants.SET_REQUEST)) {
            this.__values = v;
        }
    }

    get namespace() {
        return this.__namespace;
    }

    set namespace(v) {
        this.__namespace = v;
    }

    get authorization() {
        return this.__authorization;
    }

    set authorization(v) {
        this.__authorization = v;
    }

    get request() {
        return this.__request;
    }

    set request(v) {
        this.__request = v;
    }

    get stopped() {
        return this.__stopped === true;
    }

    stop() {
        this.__stopped = true;
    }
}

module.exports = Content;
