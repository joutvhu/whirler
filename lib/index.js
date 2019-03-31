'use strict';

const {Whirler} = require('./type/Whirler');
const WhirlerError = require('./error/WhirlerError');
const combine = require('./utilities/combine');
const {preventOverrideClass, preventOverrideFunction} = require('./validation/preventOverride');

module.exports = {
    Whirler,
    WhirlerError,
    combine,
    preventOverrideClass,
    preventOverrideFunction
};