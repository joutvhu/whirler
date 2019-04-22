'use strict';

const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const SystemConstants = require('../constants/SystemConstants');

class Request {
    constructor(type, name, values) {
        if (!SystemConstants.TYPES_REQUEST.includes(type))
            throw new WhirlerError(WhirlerMessages.REQUEST_TYPE_INVALID);
        Object.defineProperty(this, '__type', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: type
        });
        this.__name = name;
        this.__values = values;
    }

    get type() {
        return this.__type;
    }

    get function() {
        if(this.__type === SystemConstants.CALL_REQUEST)
            return this.__name;
        else return undefined;
    }

    get getter() {
        if(this.__type === SystemConstants.GET_REQUEST)
            return this.__name;
        else return undefined;
    }

    get setter() {
        if(this.__type === SystemConstants.SET_REQUEST)
            return this.__name;
        else return undefined;
    }

    get value() {
        if(this.__type === SystemConstants.SET_REQUEST)
            return this.__values;
        else return undefined;
    }

    get args() {
        if(this.__type === SystemConstants.CALL_REQUEST && this.__values instanceof Array)
            return this.__values;
        else return undefined;
    }

    get namespace() {
        return this.__namespace;
    }

    set namespace(value) {
        this.__namespace = value;
    }

    get authorization() {
        return this.__authorization;
    }

    set authorization(value) {
        this.__authorization = value;
    }
}

module.exports = Request;
