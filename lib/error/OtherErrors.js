'use strict';

class FormattedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Formatted Error';
    }
}

class DuplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Duplication Error';
    }
}

module.exports = {
    FormattedError,
    DuplicationError
};
