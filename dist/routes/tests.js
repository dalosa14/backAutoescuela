"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var router = express.Router();

var User = require("../db/models/user.js");

var Testpackage = require("../db/models/testPackage.js");

var Test = require("../db/models/test.js");

var Question = require("../db/models/question.js");

var Answer = require("../db/models/answer.js");

var _require = require("../middlewares/validations.js"),
    isAValidToken = _require.isAValidToken;

var validateUrl = require("../validations/validateUrl.js"); //crear paquete de tests


router.post("/createTestPackage", isAValidToken, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, title, img, desc, price, testpackageData, testPackage, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
}()); //crear test

router.post("/createTest", isAValidToken, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, name, img, testpackageId, testPayload, test;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
            res.json({
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
}()); //crear pregunta

router.post("/createQuestion", isAValidToken, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, name, question, img, testId, questionPayload, questionModel;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, name = _req$body3.name, question = _req$body3.question, img = _req$body3.img, testId = _req$body3.testId;

            if (!(img != '')) {
              _context3.next = 4;
              break;
            }

            if (validateUrl(img)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              data: null,
              msg: "Url no valida"
            }));

          case 4:
            questionPayload = {
              name: name,
              question: question,
              img: img
            };
            _context3.next = 7;
            return Question.create(questionPayload);

          case 7:
            questionModel = _context3.sent;
            questionModel.setTest(testId);
            res.json({
              success: true,
              data: questionModel,
              msg: 'pregunta creada'
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //crear respuesta

router.post("/createAnswer", isAValidToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body4, isTrue, name, answer, questionId, answerPayload, answerObject;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body4 = req.body, isTrue = _req$body4.isTrue, name = _req$body4.name, answer = _req$body4.answer, questionId = _req$body4.questionId;
            answerPayload = {
              answer: answer,
              name: name,
              isTrue: isTrue
            };
            _context4.next = 4;
            return Answer.create(answerPayload);

          case 4:
            answerObject = _context4.sent;
            answerObject.setQuestion(questionId);
            res.json({
              success: true,
              data: answerObject,
              msg: 'pregunta creada'
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/addTestPackageToUser", isAValidToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var packageId, user, testpackage, added;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            packageId = req.body.packageId;
            _context5.next = 3;
            return User.findOne({
              where: {
                id: req.user.id
              }
            });

          case 3:
            user = _context5.sent;
            _context5.next = 6;
            return Testpackage.findOne({
              where: {
                id: packageId
              }
            });

          case 6:
            testpackage = _context5.sent;
            console.log(user, testpackage);
            added = user.addTestPackageToUser(testpackage);
            res.json({
              success: true,
              data: added,
              msg: 'paquete añadido'
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get("/getAllTestPackages", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var testspackages;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Testpackage.findAll({
              include: {
                all: true,
                nested: true
              }
            });

          case 2:
            testspackages = _context6.sent;
            res.json({
              success: true,
              data: testspackages
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.get("/getBuyedTestPackages", isAValidToken, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var user, testPackages;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return User.findOne({
              where: {
                id: req.user.id
              }
            });

          case 2:
            user = _context7.sent;
            _context7.next = 5;
            return user.getTestPackageToUser();

          case 5:
            testPackages = _context7.sent;
            res.json({
              success: true,
              data: testPackages,
              msg: 'paquetes comprados disponibles'
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get("/getAllTestsOfPackage/:id", isAValidToken, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var packageId, testpackage, tests;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            packageId = req.params.id;
            _context8.next = 3;
            return Testpackage.findOne({
              where: {
                id: packageId
              }
            });

          case 3:
            testpackage = _context8.sent;
            _context8.next = 6;
            return testpackage.getTests();

          case 6:
            tests = _context8.sent;
            res.json({
              success: true,
              data: tests,
              msg: 'tests del pack de tests enviados correctamente'
            });

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.get("/getAllQuestionsAndAnswersOfTest/:testId", isAValidToken, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var testId, questionsAndAnswers;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
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
}());
router.get("/getAllAnswersOfQuestion/:QuestionId", isAValidToken, /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var QuestionId, Questions, answers;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            QuestionId = req.params.QuestionId;
            _context10.next = 3;
            return Question.findOne({
              where: {
                id: QuestionId
              }
            });

          case 3:
            Questions = _context10.sent;
            _context10.next = 6;
            return Questions.getAnswers();

          case 6:
            answers = _context10.sent;
            res.json({
              success: true,
              data: answers,
              msg: 'las preguntas del test han sido enviadas'
            });

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
router.get("/getOwnedTestPackages", isAValidToken, /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var profile;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return User.findByPk(req.user.id, {
              attributes: ['id', 'username', 'email'],
              include: [{
                model: Testpackage,
                as: "testPackages"
              }]
            });

          case 2:
            profile = _context11.sent;
            res.status(200).send({
              success: true,
              data: profile.testPackages,
              msg: "paquetes creados por el usuario logueado enviados."
            });

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

module.exports = router;