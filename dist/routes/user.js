"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var router = express.Router();

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var key = "123123";

var User = require("../db/models/user.js");

var Testpackage = require("../db/models/testPackage.js");

var _require = require("../middlewares/validations.js"),
    isAValidToken = _require.isAValidToken;

var validateEmail = require("../validations/validateEmail.js");
/**
 * A Register
 * @typedef {object} Register
 * @property {string} name.required - The email
 * @property {string} username.required - The password
 * @property {string} email.required - The password
 * @property {string} password.required - The password
 * @property {string} rePassword.required - The password
 */

/**
 * POST /user/register
 * @summary Registra un usuario en la base de datos
 * @tags usuario
 *   @param {Register} request.body.required - informacion de registro - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - success response example
 * 

  {
  "success": true,
  "data": "sagar55544@gmail.com",
  "msg": "Registro correcto."
}

 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - La contraseña debe contener al menos 8 carácteres
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "La contraseña debe contener al menos 8 carácteres"
}
 * @example response - 400 - El email introducido ya está en uso.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "El email introducido ya está en uso."
}
 * @example response - 400 - Hay campos vacios
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Hay campos vacios"
}
 * @example response - 400 - La contraseña debe contener al menos 8 carácteres
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "La contraseña debe contener al menos 8 carácteres"
}
 * @example response - 400 - El usuario ya ha sido utilizado.
 * 
 *  {
  "success": false,
  "data": null,
  "msg": "El usuario ya ha sido utilizado."
}
 * @example response - 400 - No es un email valido
 * 
 *  {
  "success": false,
  "data": null,
  "msg": "No es un email valido"
}
 */


router.post("/register", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, password, rePassword, userUsername, userEmail, newUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, rePassword = _req$body.rePassword;

            if (!(!username || !email || !password || !rePassword)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Hay campos vacios"
            }));

          case 4:
            if (!(password.length < 8)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "La contraseña debe contener al menos 8 carácteres"
            }));

          case 6:
            if (password !== rePassword) {} // Check for the unique Username


            _context.next = 9;
            return User.findOne({
              where: {
                username: username
              }
            });

          case 9:
            userUsername = _context.sent;

            if (!userUsername) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "El usuario ya ha sido utilizado."
            }));

          case 12:
            if (validateEmail(email)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "No es un email valido"
            }));

          case 14:
            _context.next = 16;
            return User.findOne({
              where: {
                email: email
              }
            });

          case 16:
            userEmail = _context.sent;

            if (!userEmail) {
              _context.next = 20;
              break;
            }

            console.log(userEmail);
            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "El email introducido ya está en uso."
            }));

          case 20:
            // The data is valid and new we can register the user
            newUser = {
              username: username,
              password: password,
              email: email
            }; // Hash the password

            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err;
                newUser.password = hash;
                User.create(newUser).then(function () {
                  return res.status(201).json({
                    success: true,
                    data: newUser.email,
                    msg: "Registro correcto."
                  });
                });
              });
            });
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              data: _context.t0,
              msg: "error"
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * A Login
 * @typedef {object} Login
 * @property {string} email.required - The email
 * @property {string} password.required - The password
 */

/**
 * POST /user/login
 * @summary retorna el perfil del usuario logueado
 * @tags usuario
 *   @param {Login} request.body.required - informacion de logueo - application/json
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * 
{
  "success": true,
  "data": {
    "user": {
      "email": "123123@gmail.com"
    },
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjIzMjU3NjgyLCJleHAiOjE2MjM4NjI0ODJ9.wWs_63y33u3UAlxYPHv7BQJZ-GyN0kRucVqimSB_LB4"
  },
  "msg": "Inicio de sesión completado"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - Credenciales incorrectas.
 * 
 *   {
  "msg": "Credenciales incorrectas.",
  "success": false
}
 */

router.post("/login", function (req, res) {
  try {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (!user) {
        return res.status(400).json({
          msg: "Credenciales incorrectas.",
          data: null,
          success: false
        });
      } // If there is user we are now going to compare the password


      bcrypt.compare(req.body.password, user.password).then(function (isMatch) {
        if (isMatch) {
          // User's password is correct and we need to send the JSON Token for that user
          var payload = {
            id: user.id
          };
          jwt.sign(payload, key, {
            expiresIn: 604800
          }, function (err, token) {
            res.status(200).json({
              success: true,
              data: {
                user: {
                  email: user.email,
                  name: user.name
                },
                token: "Bearer ".concat(token)
              },
              msg: "Inicio de sesión completado"
            });
          });
        } else {
          return res.status(400).json({
            msg: "Credenciales incorrectas.",
            success: false
          });
        }
      });
    });
  } catch (error) {}
});
/**
 * GET /user/isAuthenticated
 * @summary retorna el perfil del usuario logueado
 * @security BearerAuth
 * @tags usuario
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * 
 *   {
 *     "success": true,
 *     "data": {
 *       "id": 5,
 *        "username": "123123",
 *        "email": "123123@gmail.com"
 *        },
 *     "msg": "perfil enviado correctamente"
 *   }
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - success response example
 * 
 *   {
 *     "success": true,
 *     "data": {
 *       "id": 5,
 *        "username": "123123",
 *        "email": "123123@gmail.com"
 *        },
 *     "msg": "perfil enviado correctamente"
 *   }
 */

router.get("/isAuthenticated", isAValidToken, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var profile;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return User.findByPk(req.user.id, {
              attributes: ["id", "username", "email"]
            });

          case 3:
            profile = _context2.sent;
            res.status(200).send({
              success: true,
              data: profile,
              msg: "perfil enviado correctamente"
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(200).send({
              success: false,
              data: null,
              msg: "no es un token valido"
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;