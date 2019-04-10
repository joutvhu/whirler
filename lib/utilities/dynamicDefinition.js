'use strict';

exports.inheritsLoose = inheritsLoose;
exports.createFunction = createFunction;
exports.createES5Class = createES5Class;
exports.createES6Class = createES6Class;
exports.createClass = createClass;

function inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function createFunction(name, _superClass, _prototype) {
  let temp;
  let statements = 'temp = function ' + name + '() {\n';
  if (_superClass) statements += '    var _this = _superClass.apply(this, arguments) || this;\n';else statements += '    var _this = this;\n';
  if (_prototype instanceof Function) statements += '    return _prototype.apply(_this, arguments) || _this;\n';else statements += '    return _this;\n';
  statements += '}';
  eval(statements);
  return temp;
}

function createES5Class(name, superClass, prototype) {
  const subClass = createFunction(name, superClass, prototype);
  if (superClass) inheritsLoose(subClass, superClass);
  return subClass;
}

function createES6Class(name, _superClass, _prototype) {
  let temp;
  let statements = 'temp = class ' + name;
  if (_superClass) statements += ' extends _superClass';
  statements += ' {\n' + '    constructor() {\n' + '        super(...arguments);\n';
  if (_prototype instanceof Function) statements += '        _prototype.apply(this, arguments);\n';
  statements += '    }\n' + '}';
  eval(statements);
  return temp;
}

function createClass(name, superClass, prototype) {
  let temp;

  try {
    temp = createES6Class(name, superClass, prototype);
  } catch (e) {
    temp = createES5Class(name, superClass, prototype);
  }

  return temp;
}