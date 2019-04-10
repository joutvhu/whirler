'use strict';

exports.default = void 0;

var _Whirler = require("./Whirler");

var _OtherErrors = require("../error/OtherErrors");

var _ExceptionMessages = require("../constants/ExceptionMessages");

var _checkContent = require("../validation/checkContent");

class Caller {
  constructor(whirlerClass) {
    if (whirlerClass && whirlerClass.prototype instanceof _Whirler.WhirlerCore) this.whirler = new whirlerClass();else throw new _OtherErrors.FormattedError(_ExceptionMessages.default.PROVIDED_WHIRLER);
  }

  async call(content) {
    const _content = (0, _checkContent.preCheck)(content);

    return this.whirler.call(_content);
  }

}

exports.default = Caller;