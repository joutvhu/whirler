'use strict';

exports.convertWhirlerMap = convertWhirlerMap;
exports.convertWhirlerArray = convertWhirlerArray;
exports.convertWhirles = convertWhirles;

var _Whirler = require("../type/Whirler");

var _OtherErrors = require("../error/OtherErrors");

var _ExceptionMessages = require("../constants/ExceptionMessages");

var _verifyName = require("../validation/verifyName");

function convertWhirlerMap(whirles) {
  let i;

  if (whirles.constructor === {}.constructor) {
    for (i in whirles) {
      if (Object.hasOwnProperty.call(whirles, i)) {
        (0, _verifyName.verifyClassName)(i);
        if (!(whirles[i].prototype instanceof _Whirler.WhirlerCore)) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SURE_WHIRLER);
      }
    }

    const keys = Object.keys(whirles);
    if (keys.length === 0) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.PROVIDE_WHIRLERS);else if (keys.length === 1) return whirles[keys[0]];else return whirles;
  } else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.INVALID_PARAMETER);
}

function convertWhirlerArray(whirles) {
  const result = {};
  let i;
  if (whirles.length === 0) throw new _OtherErrors.FormattedError(_ExceptionMessages.default.PROVIDE_WHIRLERS);else if (whirles.length === 1) {
    if (whirles[0].prototype instanceof _Whirler.WhirlerCore) return whirles[0];else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SURE_WHIRLER);
  }

  for (i of whirles) {
    if (i.prototype instanceof _Whirler.WhirlerCore && i.name) {
      if (!result[i.name]) result[i.name] = i;else throw new _OtherErrors.DuplicationError(_ExceptionMessages.default.DUPLICATE_WHIRLER.replace('[WhirlerName]', i.name));
    } else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.SURE_WHIRLER);
  }

  return result;
}

function convertWhirles(whirles) {
  if (whirles.length === 1) {
    if (whirles[0] instanceof Array) whirles = convertWhirlerArray(whirles[0]);else whirles = convertWhirlerMap(whirles[0]);
  } else whirles = convertWhirlerArray(whirles);

  return whirles;
}