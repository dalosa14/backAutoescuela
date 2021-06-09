"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model,
    DataTypes = _require.DataTypes;

var sequelize = require('../dbConnect');

var test = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(test, _Model);

  var _super = _createSuper(test);

  function test() {
    (0, _classCallCheck2["default"])(this, test);
    return _super.apply(this, arguments);
  }

  return test;
}(Model);

test.init({
  name: {
    type: DataTypes.TEXT
  },
  img: {
    type: DataTypes.TEXT,
    "default": "https://cdn.hackernoon.com/images/0yoL1qaNrbha3fHvYlEynf39lG12-qx9l33co.jpeg"
  }
}, {
  sequelize: sequelize,
  modelName: 'test',
  timestamps: true
});
module.exports = test;