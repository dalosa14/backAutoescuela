"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _testPackage = _interopRequireDefault(require("./models/testPackage"));

var _user = _interopRequireDefault(require("./models/user"));

var _test = _interopRequireDefault(require("./models/test"));

var _question = _interopRequireDefault(require("./models/question"));

var _answer = _interopRequireDefault(require("./models/answer"));

_user["default"].hasMany(_testPackage["default"], {
  as: 'testPackages',
  foreignKey: "ownerId"
});

_testPackage["default"].belongsTo(_user["default"], {
  as: 'owner'
}); //relacion usuario paquetes de tests N:N


_user["default"].belongsToMany(_testPackage["default"], {
  through: "User_testPackage",
  as: 'testPackageToUser'
});

_testPackage["default"].belongsToMany(_user["default"], {
  through: "User_testPackage",
  as: 'userr'
});

_test["default"].belongsTo(_testPackage["default"], {
  as: 'testPackage',
  foreignKey: 'testPackageId'
});

_testPackage["default"].hasMany(_test["default"], {
  as: 'tests',
  foreignKey: 'testPackageId'
});

_test["default"].hasMany(_question["default"], {
  as: "questions"
});

_question["default"].belongsTo(_test["default"], {
  as: 'test'
});

_question["default"].hasMany(_answer["default"]);

_answer["default"].belongsTo(_question["default"], {
  as: "question"
});