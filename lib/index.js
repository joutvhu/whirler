'use strict';

const {Whirler} = require('./type/Whirler');
const Caller = require('./type/Caller');
const WhirlerError = require('./error/WhirlerError');
const combine = require('./utilities/combine');

module.exports = {
    Whirler,
    Caller,
    WhirlerError,
    combine
};