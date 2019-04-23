'use strict';

const ExceptionMessages = require('../constants/ExceptionMessages');
const Request = require('../type/Request');
const SystemConstants = require('../constants/SystemConstants');
const WhirlerError = require('../error/WhirlerError');
const WhirlerMessages = require('../constants/WhirlerMessages');
const {FormattedError, DuplicationError} = require('../error/OtherErrors');
const {StringType} = require('extension-props');
const {WhirlerCore} = require('../type/Whirler');
const {verifyClassName} = require('../validation/verifyName');

function convertGetRequset(body) {
    if (StringType.isBlank(body.get))
        throw new WhirlerError(WhirlerMessages.SPECIFY_GETTER);
    return new Request(SystemConstants.GET_REQUEST, body.get);
}

function convertPutRequset(body) {
    if (StringType.isBlank(body.set))
        throw new WhirlerError(WhirlerMessages.SPECIFY_SETTER);
    if (body.val === undefined)
        throw new WhirlerError(WhirlerMessages.SPECIFY_VALUE);
    return new Request(SystemConstants.SET_REQUEST, body.set, body.val);
}


function convertPostRequset(body) {
    if (StringType.isBlank(body.func))
        throw new WhirlerError(WhirlerMessages.SPECIFY_FUNCTION);

    if (body.args instanceof Array && body.args.length > 0)
        return new Request(SystemConstants.CALL_REQUEST, body.func, body.args);
    else return new Request(SystemConstants.CALL_REQUEST, body.func);
}

function convertRequest(method, body) {
    if (StringType.isBlank(method) || !body) return undefined;
    let result;

    if (StringType.valueOf('post').equalsIgnoreCase(method))
        result = convertPostRequset(body);
    else if (StringType.valueOf('get').equalsIgnoreCase(method))
        result = convertGetRequset(body);
    else if (StringType.valueOf('put').equalsIgnoreCase(method))
        result = convertPutRequset(body);
    else throw new WhirlerError(WhirlerMessages.REQUEST_METHOD_INVALID);

    if (result === undefined || result === null) return undefined;
    if ((body.nsp instanceof Array || typeof body.nsp === 'string') && body.nsp.length > 0)
        result.namespace = body.nsp;

    return result;
}

function convertWhirlerMap(whirles) {
    let i;

    if (whirles.constructor === {}.constructor) {
        for (i in whirles) {
            if (Object.hasOwnProperty.call(whirles, i)) {
                verifyClassName(i);
                if (!(whirles[i].prototype instanceof WhirlerCore))
                    throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
            }
        }
        const keys = Object.keys(whirles);

        if (keys.length === 0) throw new FormattedError(ExceptionMessages.PROVIDE_WHIRLERS);
        else if (keys.length === 1) return whirles[keys[0]];
        else return whirles;
    } else throw new FormattedError(ExceptionMessages.INVALID_PARAMETER);
}

function convertWhirlerArray(whirles) {
    const result = {};
    let i;

    if (whirles.length === 0) throw new FormattedError(ExceptionMessages.PROVIDE_WHIRLERS);
    else if (whirles.length === 1) {
        if (whirles[0].prototype instanceof WhirlerCore)
            return whirles[0];
        else throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
    }
    for (i of whirles) {
        if (i.prototype instanceof WhirlerCore && i.name) {
            if (!result[i.name])
                result[i.name] = i;
            else throw new DuplicationError(ExceptionMessages.DUPLICATE_WHIRLER.replace('[WhirlerName]', i.name));
        } else throw new FormattedError(ExceptionMessages.SURE_WHIRLER);
    }

    return result;
}

function convertWhirles(whirles) {
    if (whirles.length === 1) {
        if (whirles[0] instanceof Array)
            whirles = convertWhirlerArray(whirles[0]);
        else whirles = convertWhirlerMap(whirles[0]);
    } else whirles = convertWhirlerArray(whirles);

    return whirles;
}

function convertError(e) {
    if (e instanceof WhirlerError)
        return e.toJSON();
    else return {
        code: 1,
        error: WhirlerMessages.UNKNOWN
    };
}

function convertResult(r) {
    return {data: r};
}

module.exports = {
    convertError,
    convertResult,
    convertRequest,
    convertWhirles
};
