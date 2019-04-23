'use strict';

const {Caller, ErrorMessages} = require('#index');
const {stringConstants, WhirlerA, callerA, callerB, callerC, callerAC, callerEF, callerABC, callerBIB} = require('../prepare');

test('create caller fail', () => {
    expect(() => new Caller()).toThrow(ErrorMessages.PROVIDED_WHIRLER);
});

test('create caller success', () => {
    expect(new Caller(WhirlerA)).toHaveProperty('whirler');
});

test('call function in caller', async () => {
    const firstNumber = Math.floor(Math.random() * Math.floor(1000)), secondNumber = 1503;
    const expected = firstNumber + secondNumber;

    expect(await callerC.call({
        type: 'call',
        function: 'sumTowNumbers',
        arguments: [firstNumber, secondNumber]
    })).toBe(expected);
});

test('call function with string namespace', async () => {
    const firstNumber = Math.floor(Math.random() * Math.floor(1000)), secondNumber = 658;
    const expected = firstNumber + secondNumber;

    expect(await callerABC.call({
        type: 'call',
        namespace: 'WhirlerC',
        function: 'sumTowNumbers',
        arguments: [firstNumber, secondNumber]
    })).toBe(expected);

    expect(await callerBIB.call({
        type: 'call',
        namespace: 'BundleEF.WhirlerE',
        function: 'getText'
    })).toBe(stringConstants.textA);
});

test('call function with array namespace', async () => {
    expect(await callerBIB.call({
        type: 'call',
        namespace: ['BundleEF', 'WhirlerF'],
        function: 'getText'
    })).toBe(stringConstants.textB);

    expect(await callerBIB.call({
        type: 'call',
        namespace: ['WhirlerC'],
        function: 'getText'
    })).toBe(stringConstants.textC);
});

test('stop function in midway', async () => {
    expect(callerAC.call({
        type: 'call',
        namespace: 'WhirlerA',
        function: 'stopFunc'
    })).rejects.toThrow(ErrorMessages.FORCED_STOP);
});

test('no provide namespace', async () => {
    expect(callerEF.call({
        type: 'call',
        function: 'getText'
    })).rejects.toThrow(ErrorMessages.FUNCTION_NOT_EXIST);
});

test('restore function name', async () => {
    expect(await callerA.call({
        type: 'call',
        function: 'restoreName',
        arguments: ['arg']
    })).toBe(stringConstants.textB);
});
