'use strict';

const {WhirlerBundle} = require('../type/Whirler');

function combine(whirles) {
    return new WhirlerBundle(whirles);
}

module.exports = combine;