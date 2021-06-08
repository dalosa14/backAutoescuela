"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require("jsonwebtoken");

var express = require("express");

var key = "123123";
var router = express.Router();

var User = require("../db/models/user");

var isAValidToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, _jwt$verify, id, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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