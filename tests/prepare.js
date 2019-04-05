'use strict';

const {Whirler, Caller, WhirlerError, ErrorMessages, combine} = require('#index');
const {WhirlerCore} = require('#type/Whirler');

const stringConstants = {
    textA: 'Content of textA',
    textB: 'Content of textB',
    textC: 'Content of textC',
    error: 'Message of error',
    notExecuted: 'Not executed.'
};

class SubWhirlerCore extends WhirlerCore {
    getText() {
        return stringConstants.textA;
    }
}

class OverriddenCall extends Whirler {
    call(content) {
        return 'Content: ' + content;
    }
}

class WhirlerA extends Whirler {
    middleware(content) {
        if(content.function == 'stopFunc')
            content.stop = true;
        else if(content.function == 'restoreName')
            content = {};

        return content;
    }

    stopFunc() {
        return stringConstants.notExecuted;
    }

    restoreName(arg) {
        if(arg)
            return stringConstants.textA;
        else return stringConstants.textB;
    }

    getText() {
        return stringConstants.textA;
    }

    getWhirlerError() {
        throw new WhirlerError(stringConstants.error);
    }
}

class WhirlerB extends Whirler {
    getText() {
        return stringConstants.textB;
    }

    getError() {
        throw new Error(stringConstants.error);
    }
}

class WhirlerC extends Whirler {
    getText() {
        return stringConstants.textC;
    }

    sumTowNumbers(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }
}

const BundleAC = combine('BundleAC', WhirlerA, WhirlerC);
const BundleEF = combine('BundleEF', {
    WhirlerE: WhirlerA,
    WhirlerF: WhirlerB
});
const BundleABC = combine('BundleABC', WhirlerA, WhirlerB, WhirlerC);
const BundleInBundle = combine('BundleInBundle', WhirlerC, BundleEF);

const callerA = new Caller(WhirlerA);
const callerB = new Caller(WhirlerB);
const callerC = new Caller(WhirlerC);
const callerAC = new Caller(BundleAC);
const callerEF = new Caller(BundleEF);
const callerABC = new Caller(BundleABC);
const callerBIB = new Caller(BundleInBundle);

module.exports = {
    stringConstants,
    SubWhirlerCore,
    OverriddenCall,
    WhirlerA,
    WhirlerB,
    WhirlerC,
    BundleAC,
    BundleEF,
    BundleABC,
    BundleInBundle,
    callerA,
    callerB,
    callerC,
    callerAC,
    callerEF,
    callerABC,
    callerBIB
};