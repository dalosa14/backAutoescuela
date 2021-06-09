"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var jwt = require("jsonwebtoken");

var express = require("express");

var key = "123123";
var router = express.Router();

var User = require("../db/models/user");

var isAValidToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, _jwt$verify, id, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authorization.split(" ")[1];
            _jwt$verify = jwt.verify(token, key), id = _jwt$verify.id;
            _context.next = 4;
            return User.findOne({
              where: {
                id: id
              },
              attributes: ["id", "username", "email"]
            }, {
              raw: true
            });

          case 4:
            user = _context.sent;
            console.log(user);

            if (user) {
              req.user = user.dataValues;
            }

            next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAValidToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  isAValidToken: isAValidToken
};