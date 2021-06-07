const express = require("express");
const router = express.Router();
const User = require("../db/models/user");
const Testpackage = require("../db/models/testPackage");
const Test = require("../db/models/test");
const Question = require("../db/models/question");
const Answer = require("../db/models/answer");
const { isAValidToken } = require("../middlewares/validations");

//crear paquete de tests
router.post("/createTestPackage", isAValidToken, async (req, res) => {
  let { name, title, img, desc, price } = req.body;

  let testpackage = {
    name,
    title,
    img,
    desc,
    price,
  };
  let tests = await Testpackage.create(testpackage);
  await tests.setOwner(req.user.id);
  console.log(tests);
  res.json({ success: true });
});
//crear test
router.post("/createTest", isAValidToken, async (req, res) => {
  let { name,  img, testpackageId } = req.body;

  let testPayload = {
    name,
    img,
   
  };
  let test = await Test.create(testPayload);
  test.setTestPackage(testpackageId)
  res.json({ success: true,data:test,msg:'test creado' });
});
//crear pregunta
router.post("/createQuestion", isAValidToken, async (req, res) => {
  let { name,  img, testId } = req.body;

  let questionPayload = {
    name,
    question,
    img,
   
  };
  let question = await Question.create(questionPayload);
  question.setTest(testId)
  res.json({ success: true,data:question,msg:'pregunta creada' });
});
//crear respuesta
router.post("/createAnswer", isAValidToken, async (req, res) => {
  let { isTrue, name, answer, questionId } = req.body;

  let answerPayload = {
    answer,
    name,
    isTrue,
   
  };
  let answerObject = await Answer.create(answerPayload);
  answerObject.setQuestion(questionId)
  res.json({ success: true,data:answerObject,msg:'pregunta creada' });
});
router.post("/addTestPackageToUser", isAValidToken, async (req, res) => {
  let { packageId } = req.body;

  let user = await User.findOne({where:{id:req.user.id}})
  let testpackage = await Testpackage.findOne({where:{id:packageId}})
  console.log(user,testpackage);
  let added = user.addTestPackageToUser(testpackage)
 
  res.json({ success: true,data:added,msg:'paquete añadido' });
});

router.get("/getAllTestPackages", async (req, res) => {
  let testspackages = await Testpackage.findAll({include: { all: true, nested: true}})
  res.json({ success: true ,data:testspackages});
});
router.get("/getBuyedTestPackages",isAValidToken, async (req, res) => {
  let user = await User.findOne({where:{id:req.user.id}})
  let testPackages = await  user.getTestPackageToUser()

  res.json({ success: true ,data:testPackages,msg:'paquetes comprados disponibles'});
});
router.get("/getAllTestsOfPackage/:id",isAValidToken, async (req, res) => {
  let packageId = req.params.id
  let testpackage = await Testpackage.findOne({where:{id:packageId}})
   let tests = await testpackage.getTests()
  res.json({ success: true ,data:tests,msg:'tests del pack de tests enviados correctamente'});
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

module.exports = router;
