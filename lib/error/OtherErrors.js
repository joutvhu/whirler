'use strict';

class FormattedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Formatted Error';
    }
}

class OverrideErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'Override Error';
    }
}

module.exports = {
    FormattedError,
    OverrideErrors
};