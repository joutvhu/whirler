'use strict';

const {combine} = require('#index');
const {stringConstants, BundleABC, WhirlerA, WhirlerB, WhirlerC} = require('../prepare');

test('combine two Whirlers', () => {
    expect(combine('BundleAB', WhirlerA, WhirlerB)).toHaveProperty('name', 'BundleAB');
    expect(combine('BundleAC', WhirlerA, WhirlerC)).toHaveProperty('name', 'BundleAC');
});

test('combine three Whirlers', () => {
    expect(combine('BundleABC', WhirlerA, WhirlerB, WhirlerC)).toHaveProperty('name', 'BundleABC');
});

test('call function in bundle', async () => {
    const whirlerObj = new BundleABC();

    expect(await whirlerObj.call({
        namespace: ['WhirlerA'],
        function: 'getText'
    })).toBe(stringConstants.textA);

    expect(await whirlerObj.call({
        namespace: ['WhirlerC'],
        function: 'getText'
    })).toBe(stringConstants.textC);
});