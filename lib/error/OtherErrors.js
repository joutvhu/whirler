'use strict';

exports.DuplicationError = exports.OverridingError = exports.FormattedError = void 0;

class FormattedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Formatted Error';
  }

}

exports.FormattedError = FormattedError;

class OverridingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Overriding Error';
  }

}

exports.OverridingError = OverridingError;

class DuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Duplication Error';
  }

}

exports.DuplicationError = DuplicationError;