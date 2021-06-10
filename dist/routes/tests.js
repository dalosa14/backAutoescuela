"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var router = express.Router();

var User = require("../db/models/user.js");

var Testpackage = require("../db/models/testPackage.js");

var Test = require("../db/models/test.js");

var Question = require("../db/models/question.js");

var Answer = require("../db/models/answer.js");

var _require = require("../middlewares/validations.js"),
    isAValidToken = _require.isAValidToken;

var validateUrl = require("../validations/validateUrl.js");
/**
 * A TestPack
 * @typedef {object} TestPack
 * @property {string} name.required - El nombre
 * @property {string} title.required - El titulo visible
 * @property {string} img - La imagen
 * @property {string} desc.required - La descripcion del pack de tests
 * @property {string} price.required - El precio del pack
 */

/**
 * POST /tests/createTestPackage
 * @summary crea un nuevo pack de tests
 * @tags tests
 *   @security BearerAuth

 *   @param {TestPack} request.body.required - informacion de creación del pack de tests - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - pack de tests creado correctamente
 * 
{
  "success": true,
  "data": {
    "id": 35,
    "name": "prueba2",
    "title": "prueb2",
    "img": "https://elements-assets.envato.com/apps/storefront/audioCover01-8c537039e711097cca2b.svg",
    "desc": "hola musdfy buenas",
    "price": "0",
    "updatedAt": "2021-06-09T17:54:25.390Z",
    "createdAt": "2021-06-09T17:54:25.102Z",
    "ownerId": 5
  },
  "msg": "pack de tests creado correctamente"
}
 * @example response - 200 - token no valido
 * 

  "success": false,
  "msg": "token no valido",
  "data": null
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - Hay campos vacios
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Hay campos vacios"
}
 * @example response - 400 - Credenciales incorrectas.
 * 
 *   {
  "msg": "Credenciales incorrectas.",
  "success": false
}
 * @example response - 400 - El precio debe ser 0 o un numero positivo.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "El precio debe ser 0 o un numero positivo"
}
 * @example response - 400 - Url no valida.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Url no valida"
}
 */


router.post("/createTestPackage", isAValidToken, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, title, img, desc, price, testpackageData, testPackage, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, title = _req$body.title, img = _req$body.img, desc = _req$body.desc, price = _req$body.price;

            if (!(img != '')) {
              _context.next = 4;
              break;
            }

            if (validateUrl(img)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Url no valida"
            }));

          case 4:
            if (!(name == '' || title == '' || desc == '')) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Hay campos vacios"
            }));

          case 6:
            if (!(Number(price) < 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "El precio debe ser 0 o un numero positivo"
            }));

          case 8:
            testpackageData = {
              name: name,
              title: title,
              img: img,
              desc: desc,
              price: price
            };
            _context.next = 11;
            return Testpackage.create(testpackageData);

          case 11:
            testPackage = _context.sent;
            _context.next = 14;
            return User.findByPk(req.user.id);

          case 14:
            user = _context.sent;
            _context.next = 17;
            return testPackage.setOwner(req.user.id);

          case 17:
            user.addTestPackageToUser(testPackage);
            return _context.abrupt("return", res.status(201).json({
              success: true,
              data: testPackage,
              msg: "pack de tests creado correctamente"
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * A Test
 * @typedef {object} Test
 * @property {string} name.required - El nombre
 * @property {number} testpackageId.required - El id del pack de tests
 * @property {string} img - La imagen

 */

/**
 * POST /tests/createTest
 * @summary crea un nuevo pack de tests
 * @tags tests
 * @security BearerAuth

 *   @param {Test} request.body.required - informacion de creación del pack del test - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - pack de tests creado correctamente
 * 
{
  "success": true,
  "data": {
    "id": 3,
    "name": "prueba3",
    "img": "https://elements-assets.envato.com/apps/storefront/audioCover01-8c537039e711097cca2b.svg",
    "updatedAt": "2021-06-04T15:31:51.007Z",
    "createdAt": "2021-06-04T15:31:50.964Z",
    "testPackageId": 1
  },
  "msg": "test creado"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - Hay campos vacios
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Hay campos vacios"
}

 * @example response - 400 - Url no valida.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Url no valida"
}
 */

router.post("/createTest", isAValidToken, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, name, img, testpackageId, testPayload, test;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, img = _req$body2.img, testpackageId = _req$body2.testpackageId;

            if (!(img != '')) {
              _context2.next = 4;
              break;
            }

            if (validateUrl(img)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Url no valida"
            }));

          case 4:
            if (!(!name || !testpackageId)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Hay campos vacios"
            }));

          case 6:
            testPayload = {
              name: name,
              img: img
            };
            _context2.next = 9;
            return Test.create(testPayload);

          case 9:
            test = _context2.sent;
            test.setTestPackage(testpackageId);
            res.status(201).json({
              success: true,
              data: test,
              msg: 'test creado'
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * A Question
 * @typedef {object} Question
 * @property {string} name.required - El nombre
 * @property {string} question.required - El id del pack de tests
 * @property {number} testId.required - El id del pack de tests
 * @property {string} img - La imagen

 */

/**
 * POST /tests/createQuestion
 * @summary crea una nueva pregunta para un test
 * @tags tests
 * @security BearerAuth
 * @param {Question} request.body.required - informacion de creación de la pregunta - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - pack de tests creado correctamente
 * 
{
  "success": true,
  "data": {
    "id": 155,
    "name": "Carretera",
    "question": "Por donde se circula",
    "img": "",
    "updatedAt": "2021-06-09T19:20:35.683Z",
    "createdAt": "2021-06-09T19:20:34.432Z",
    "testId": 5
  },
  "msg": "pregunta creada"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - Hay campos vacios
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Hay campos vacios"
}

 * @example response - 400 - Url no valida.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Url no valida"
}
 */

router.post("/createQuestion", isAValidToken, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body3, name, question, img, testId, questionPayload, questionModel;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, name = _req$body3.name, question = _req$body3.question, img = _req$body3.img, testId = _req$body3.testId;

            if (!(!name || !question || !testId)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Hay campos vacios"
            }));

          case 3:
            if (!img) {
              _context3.next = 6;
              break;
            }

            if (validateUrl(img)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Url no valida"
            }));

          case 6:
            questionPayload = {
              name: name,
              question: question,
              img: img
            };
            _context3.next = 9;
            return Question.create(questionPayload);

          case 9:
            questionModel = _context3.sent;
            questionModel.setTest(testId);
            res.json({
              success: true,
              data: questionModel,
              msg: 'pregunta creada'
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/**
 * A Answer
 * @typedef {object} Answer
 * @property {string} answer.required - La respuesta para la pregunta
 * @property {number} questionId.required - El id del pack de la pregunta
 * @property {boolean} isTrue.required - Si es o no verdadera

 */

/**
 * POST /tests/createAnswer
 * @summary crea una nueva respueta para una pregunta
 * @tags tests
 * @security BearerAuth
 * @param {Answer} request.body.required - informacion de creación de la respuesta - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - respuesta creada
 * 
{
  "success": true,
  "data": {
    "id": 365,
    "answer": "esta es al ca",
    "isTrue": true,
    "updatedAt": "2021-06-09T19:30:28.733Z",
    "createdAt": "2021-06-09T19:30:28.542Z",
    "questionId": 6
  },
  "msg": "respuesta creada"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json
 * @example response - 400 - Hay campos vacios
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Hay campos vacios"
}

 * @example response - 400 - Error al crear la respuesta.
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "Error al crear la respuesta."
}
 */

router.post("/createAnswer", isAValidToken, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body4, isTrue, answer, questionId, answerPayload, answerObject;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body4 = req.body, isTrue = _req$body4.isTrue, answer = _req$body4.answer, questionId = _req$body4.questionId;

            if (!(!answer || !questionId)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Hay campos vacios"
            }));

          case 4:
            answerPayload = {
              answer: answer,
              isTrue: isTrue
            };
            _context4.next = 7;
            return Answer.create(answerPayload);

          case 7:
            answerObject = _context4.sent;
            answerObject.setQuestion(questionId);
            res.status(200).json({
              success: true,
              data: answerObject,
              msg: 'respuesta creada'
            });
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              success: false,
              data: null,
              msg: 'Error al crear la respuesta'
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * A TestToUser
 * @typedef {object} TestToUser
 * @property {number} packageId.required - El id del pack de la pregunta

 */

/**
 * POST /tests/addTestPackageToUser
 * @summary Se añade un pack de tests a la lista de packs comprados por el usuario logueado
 * @tags tests
 * @security BearerAuth
 * @param {TestToUser} request.body.required - id del test a añadir al usuario - application/json
 * @return {object} 201 - success response - application/json
 * @example response - 201 - paquete añadido
 * 
{
  "success": true,
  "data": null,
  "msg": "paquete añadido"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error al añadir el pack de test al usuario
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error al añadir el pack de test al usuario"
}
 */

router.post("/addTestPackageToUser", isAValidToken, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var packageId, user, testpackage, added;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            packageId = req.body.packageId;
            _context5.prev = 1;
            _context5.next = 4;
            return User.findOne({
              where: {
                id: req.user.id
              }
            });

          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return Testpackage.findOne({
              where: {
                id: packageId
              }
            });

          case 7:
            testpackage = _context5.sent;
            console.log(user, testpackage);
            added = user.addTestPackageToUser(testpackage);
            res.status(201).json({
              success: true,
              data: null,
              msg: 'paquete añadido'
            });
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            res.status(400).json({
              success: true,
              data: null,
              msg: 'error al añadir el pack de test al usuario'
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * GET /tests/getAllTestPackages
 * @summary se reciben todos los tests
 * @tags tests
 * @security BearerAuth
 * @return {object} 200 - success response - application/json
 * @example response - 200 - paquete enviados
 * 
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "pack de conducir 1",
      "title": "Permiso B",
      "img": "https://www.autoescuelameliana.com/wp-content/uploads/2020/05/ampliaci%C3%B3n-digital-1.jpg",
      "desc": "Con este test aprenderás el teorico del permiso B",
      "price": 0,
      "createdAt": "2021-06-09T10:22:37.000Z",
      "updatedAt": "2021-06-09T10:22:37.000Z",
      "ownerId": 5
    }
  ],
  "msg": "paquetes enviados"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error 
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error "
}
 */

router.get("/getAllTestPackages", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var testspackages;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Testpackage.findAll();

          case 3:
            testspackages = _context6.sent;
            res.status(200).json({
              success: true,
              data: testspackages,
              msg: 'paquetes enviados'
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json({
              success: true,
              data: null,
              msg: 'error'
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * GET /tests/getBuyedTestPackages
 * @summary se reciben todos los tests comprados del usuario logueado
 * @tags tests
 * @security BearerAuth
 * @return {object} 200 - success response - application/json
 * @example response - 200 - paquete enviados
 * 
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "pack de conducir 1",
      "title": "Permiso B",
      "img": "https://www.autoescuelameliana.com/wp-content/uploads/2020/05/ampliaci%C3%B3n-digital-1.jpg",
      "desc": "Con este test aprenderás el teorico del permiso B",
      "price": 0,
      "createdAt": "2021-06-09T10:22:37.000Z",
      "updatedAt": "2021-06-09T10:22:37.000Z",
      "ownerId": 5,
      "User_testPackage": {
        "createdAt": "2021-06-09T10:22:38.000Z",
        "updatedAt": "2021-06-09T10:22:38.000Z",
        "userId": 5,
        "testpackageId": 5
      }
    }
    
  ],
  "msg": "paquetes comprados disponibles"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error "
}
 */

router.get("/getBuyedTestPackages", isAValidToken, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user, testPackages;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return User.findOne({
              where: {
                id: req.user.id
              }
            });

          case 3:
            user = _context7.sent;
            _context7.next = 6;
            return user.getTestPackageToUser();

          case 6:
            testPackages = _context7.sent;
            res.status(200).json({
              success: true,
              data: testPackages,
              msg: 'paquetes comprados disponibles'
            });
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            res.status(400).json({
              success: true,
              data: null,
              msg: 'error'
            });

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
/**
 * GET /tests/getAllTestsOfPackage/{id}
 * @summary se reciben todos los tests comprados del usuario logueado
 * @tags tests
 * @param {string} id.query.required - Id del pack de tests del que queremos todos sus tests 

 *  
 * @security BearerAuth
 * @return {object} 200 - success response - application/json
 * @example response - 200 - tests del pack de tests enviados correctamente
 * 
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "El volante",
      "img": "https://www.lavanguardia.com/files/og_thumbnail/uploads/2019/02/01/5f15f6937f64b.jpeg",
      "createdAt": "2021-06-09T10:23:00.000Z",
      "updatedAt": "2021-06-09T10:23:00.000Z",
      "testPackageId": 5,
      "testpackageId": 5
    }
  ],
  "msg": "tests del pack de tests enviados correctamente"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error "
}
 */

router.get("/getAllTestsOfPackage/:id", isAValidToken, /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var packageId, testpackage, tests;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            packageId = req.params.id;
            _context8.next = 4;
            return Testpackage.findOne({
              where: {
                id: packageId
              }
            });

          case 4:
            testpackage = _context8.sent;
            _context8.next = 7;
            return testpackage.getTests();

          case 7:
            tests = _context8.sent;
            res.status(200).json({
              success: true,
              data: tests,
              msg: 'tests del pack de tests enviados correctamente'
            });
            _context8.next = 14;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            res.status(200).json({
              success: true,
              data: null,
              msg: 'error'
            });

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 11]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
/**
 * GET /tests/getAllQuestionsAndAnswersOfTest/{testId}
 * @summary se reciben todos los tests comprados del usuario logueado
 * @tags tests
 * @param {string} testId.query.required - Id del test del que queremos todos sus preguntas y respuestas 

 *  
 * @security BearerAuth
 * @return {object} 200 - success response - application/json
 * @example response - 200 - tests del pack de tests enviados correctamente
 * 
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "El volante",
      "img": "https://www.lavanguardia.com/files/og_thumbnail/uploads/2019/02/01/5f15f6937f64b.jpeg",
      "createdAt": "2021-06-09T10:23:00.000Z",
      "updatedAt": "2021-06-09T10:23:00.000Z",
      "testPackageId": 5,
      "testpackageId": 5
    }
  ],
  "msg": "tests del pack de tests enviados correctamente"
}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error "
}
 */

router.get("/getAllQuestionsAndAnswersOfTest/:testId", isAValidToken, /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var testId, questionsAndAnswers;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            testId = req.params.testId;
            _context9.next = 3;
            return Question.findAll({
              where: {
                testId: testId
              },
              include: {
                model: Answer
              }
            });

          case 3:
            questionsAndAnswers = _context9.sent;
            //  let questions = await test.getQuestions()
            res.json({
              success: true,
              data: questionsAndAnswers,
              msg: 'las preguntas del test han sido enviadas'
            });

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}()); // router.get("/getAllAnswersOfQuestion/:QuestionId",isAValidToken, async (req, res) => {
//   let QuestionId = req.params.QuestionId
//   let Questions = await Question.findOne({where:{id:QuestionId}})
//    let answers = await Questions.getAnswers()
//   res.json({ success: true ,data:answers,msg:'las preguntas del test han sido enviadas'});
// });

/**
 * GET /tests/getOwnedTestPackages
 * @summary se reciben todos los packs de tests creados por el usuario logueado
 * @tags tests

 *  
 * @security BearerAuth
 * @return {object} 200 - success response - application/json
 * @example response - 200 - paquetes creados por el usuario logueado enviados.
 * 
{"success":true,"data":[{"id":5,"name":"Permiso B","title":"Permiso B 1","img":"https://autoescuelas-premium.com/wp-content/uploads/2019/01/manual-del-permiso-b-del-carnet-de-conducir.jpg","desc":"Con este pack estrás más preparado para aprobar el teorico del permiso B","price":0,"createdAt":"2021-06-09T22:23:08.000Z","updatedAt":"2021-06-09T22:23:08.000Z","ownerId":5},{"id":15,"name":"asd","title":"asd","img":"","desc":"dasd","price":0,"createdAt":"2021-06-09T23:04:28.000Z","updatedAt":"2021-06-09T23:04:28.000Z","ownerId":5}],"msg":"paquetes creados por el usuario logueado enviados."}
 * 

 * 
 *
 *
 * @return {object} 400 - Bad request response - application/json

 * @example response - 400 - error
 * 
 *   {
  "success": false,
  "data": null,
  "msg": "error "
}
 */

router.get("/getOwnedTestPackages", isAValidToken, /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var profile;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return User.findByPk(req.user.id, {
              attributes: ['id', 'username', 'email'],
              include: [{
                model: Testpackage,
                as: "testPackages"
              }]
            });

          case 3:
            profile = _context10.sent;
            res.status(200).send({
              success: true,
              data: profile.testPackages,
              msg: "paquetes creados por el usuario logueado enviados."
            });
            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            res.status(400).send({
              success: true,
              data: null,
              msg: "error"
            });

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
module.exports = router;