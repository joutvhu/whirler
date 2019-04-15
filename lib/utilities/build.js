const Caller = require('../type/Caller');

function build(whirler) {
    return new Caller(whirler);
}

module.exports = build;
