'use strict';

const {Caller, ErrorMessages, combine} = require('#index');
const {stringConstants, WhirlerA, callerC, callerABC, callerBIB} = require('../prepare');

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
        function: 'sumTowNumbers',
        arguments: [firstNumber, secondNumber]
    })).toBe(expected);
});

test('call function with string namespace', async () => {
    const firstNumber = Math.floor(Math.random() * Math.floor(1000)), secondNumber = 658;
    const expected = firstNumber + secondNumber;

    expect(await callerABC.call({
        namespace: 'WhirlerC',
        function: 'sumTowNumbers',
        arguments: [firstNumber, secondNumber]
    })).toBe(expected);

    expect(await callerBIB.call({
        namespace: 'BundleEF.WhirlerE',
        function: 'getText'
    })).toBe(stringConstants.textA);
});

test('call function with array namespace', async () => {
    expect(await callerBIB.call({
        namespace: ['BundleEF', 'WhirlerF'],
        function: 'getText'
    })).toBe(stringConstants.textB);

    expect(await callerBIB.call({
        namespace: ['WhirlerC'],
        function: 'getText'
    })).toBe(stringConstants.textC);
});