'use strict';

const {ErrorMessages} = require('#index');
const {FormattedError} = require('#error/OtherErrors');
const OverridingError = require('extension-props/lib/errors/OverridingError');
const {stringConstants, SubWhirlerCore, OverriddenCall, FunctionInvalid, WhirlerA, WhirlerB, WhirlerC} = require('../prepare');

test('error override WhirlerCore', () => {
    expect(() => new SubWhirlerCore()).toThrow(OverridingError);
});

test('error override call function', () => {
    expect(() => new OverriddenCall()).toThrow(OverridingError);
});

test('error function name invalid', () => {
    expect(() => new FunctionInvalid()).toThrow(FormattedError);
});

test('call function with arguments', async () => {
    const whirlerObj = new WhirlerC();
    const firstNumber = Math.floor(Math.random() * Math.floor(1000)), secondNumber = 598;
    const expected = firstNumber + secondNumber;

    expect(await whirlerObj.call({
        type: 'call',
        function: 'sumTowNumbers',
        arguments: [firstNumber, secondNumber]
    })).toBe(expected);
});

test('call function without arguments', async () => {
    const whirlerObj = new WhirlerA();

    expect(await whirlerObj.call({
        type: 'call',
        function: 'getText',
        arguments: []
    })).toBe(stringConstants.textA);
    expect(await whirlerObj.call({ function: 'getText' })).toBe(stringConstants.textA);
});

test('call function and expect exception', () => {
    const whirlerObj = new WhirlerB();

    expect(whirlerObj.call({
        type: 'call',
        function: 'getError'
    })).rejects.toThrow(stringConstants.error);
    expect(whirlerObj.call({
        type: 'call',
        function: 'getError',
        arguments: []
    })).rejects.toThrow(stringConstants.error);
});

test('call the not exist function', () => {
    const whirlerObj = new WhirlerC();

    expect(whirlerObj.call({
        type: 'call',
        function: 'notExist'
    })).rejects.toThrow(ErrorMessages.FUNCTION_NOT_EXIST);
    expect(whirlerObj.call({
        type: 'call',
        function: 'not Exist',
        arguments: []
    })).rejects.toThrow(ErrorMessages.FUNCTION_NOT_EXIST);
});
