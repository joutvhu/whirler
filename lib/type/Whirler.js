'use strict';

exports.WhirlerBundle = exports.Whirler = exports.WhirlerCore = void 0;

var _RegularExpression = require("../constants/RegularExpression");

var _WhirlerMessages = require("../constants/WhirlerMessages");

var _WhirlerError = require("../error/WhirlerError");

var _realizeWhirles = require("../utilities/realizeWhirles");

var _checkContent = require("../validation/checkContent");

var _preventOverride = require("../validation/preventOverride");

var _verifyName = require("../validation/verifyName");

var _verifyWhirlerProperties = require("../validation/verifyWhirlerProperties");

class WhirlerCore {
  constructor() {
    (0, _preventOverride.preventOverrideClass)(WhirlerCore, this, [Whirler, WhirlerBundle]);
    (0, _verifyName.verifyClassName)(this.constructor.name);
  }

  call(content) {
    if (content) {
      if (this.middleware instanceof Function) {
        const backup = {
          function: content.function
        };
        if (content.namespace instanceof Array && content.namespace.length > 0) backup.namespace = [...content.namespace];
        content = this.middleware(content);
        if (!content) content = backup;else {
          content.function = backup.function;
          if (backup.namespace) content.namespace = backup.namespace;
        }
      }

      if (content.stop) throw new _WhirlerError.default(_WhirlerMessages.default.FORCED_STOP);
    } else throw new _WhirlerError.default(_WhirlerMessages.default.INVALID_REQUEST);

    return content;
  }

}

exports.WhirlerCore = WhirlerCore;

class Whirler extends WhirlerCore {
  constructor() {
    super();
    (0, _preventOverride.preventOverrideFunction)(Whirler, _RegularExpression.default.SYSTEM_FUNCTION, this);
    (0, _verifyWhirlerProperties.verifyWhirlerProperties)(this);
  }

  async call(content) {
    content = super.call(content);

    _checkContent.verifyFunction.call(this, content);

    (0, _checkContent.verifyArguments)(content);
    if (content.arguments instanceof Array) return this[content.function](...content.arguments);else return this[content.function]();
  }

}

exports.Whirler = Whirler;

class WhirlerBundle extends WhirlerCore {
  constructor() {
    super();
    this.__packages = (0, _realizeWhirles.default)(this.__whirles);
  }

  async call(content) {
    content = super.call(content);

    if (content.namespace instanceof Array && content.namespace.length > 0) {
      const nsp = content.namespace.shift();
      if (typeof nsp === 'string' && this.__packages[nsp] instanceof WhirlerCore) return this.__packages[nsp].call(content);
    }

    throw new _WhirlerError.default(_WhirlerMessages.default.FUNCTION_NOT_EXIST);
  }

}

exports.WhirlerBundle = WhirlerBundle;