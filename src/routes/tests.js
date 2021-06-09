const express = require("express");
const router = express.Router();
const User = require("../db/models/user.js");
const Testpackage = require("../db/models/testPackage.js");
const Test = require("../db/models/test.js");
const Question = require("../db/models/question.js");
const Answer = require("../db/models/answer.js");
const { isAValidToken } = require("../middlewares/validations.js");
const validateUrl =require("../validations/validateUrl.js")

//crear paquete de tests
router.post("/createTestPackage", isAValidToken, async (req, res) => {
  let { name, title, img, desc, price } = req.body;
  if(img != ''){
    
    if (!validateUrl(img)) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Url no valida",
      });
    }
  }
  if(name == ''|| title == '' ||  desc == '' ){
    return res.status(400).json({
      success: false,
      data: null,
      msg: "Hay campos vacios",
    });
  }
  if(Number(price) < 0){
    return res.status(400).json({
      success: false,
      data: null,
      msg: "El precio debe ser 0 o un numero positivo",
    });
  }
  let testpackageData = {
    name,
    title,
    img,
    desc,
    price,
  };
  let testPackage = await Testpackage.create(testpackageData);
  let user = await User.findByPk(req.user.id);
  await testPackage.setOwner(req.user.id);
  user.addTestPackageToUser(testPackage)
  return res.status(201).json({
    success: true,
    data: testPackage,
    msg: "pack de tests creado correctamente",
  });
});
//crear test
router.post("/createTest", isAValidToken, async (req, res) => {
  let { name,  img, testpackageId } = req.body;
  
  if(img != ''){
    
    if (!validateUrl(img)) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Url no valida",
      });
    }
  }
  if(!name  || !testpackageId ){
    return res.status(400).json({
      success: false,
      data: null,
      msg: "Hay campos vacios",
    });
  }
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

  let { name,question , img, testId } = req.body;
  if(!name  || !question || !testId ){
    return res.status(400).json({
      success: false,
      data: null,
      msg: "Hay campos vacios",
    });
  }
  if(img ){
    
    if (!validateUrl(img)) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Url no valida",
      });
    }
  }
  let questionPayload = {
    name,
    question,
    img,
   
  };
  let questionModel = await Question.create(questionPayload);
  questionModel.setTest(testId)
  res.json({ success: true,data:questionModel,msg:'pregunta creada' });
});
//crear respuesta
router.post("/createAnswer", isAValidToken, async (req, res) => {
  let { isTrue, answer, questionId } = req.body;

  let answerPayload = {
    answer,
    
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
router.get("/getAllQuestionsAndAnswersOfTest/:testId",isAValidToken, async (req, res) => {
  let testId = req.params.testId
  let questionsAndAnswers =await Question.findAll({where:{testId:testId},include: { model: Answer }})

  //  let questions = await test.getQuestions()
  res.json({ success: true ,data:questionsAndAnswers,msg:'las preguntas del test han sido enviadas'});
});
router.get("/getAllAnswersOfQuestion/:QuestionId",isAValidToken, async (req, res) => {
  let QuestionId = req.params.QuestionId
  let Questions = await Question.findOne({where:{id:QuestionId}})
   let answers = await Questions.getAnswers()
  res.json({ success: true ,data:answers,msg:'las preguntas del test han sido enviadas'});
});
router.get(
  "/getOwnedTestPackages",
  isAValidToken,
  async (req, res) => {
    
    
   let profile= await User.findByPk(req.user.id,{
     attributes:['id','username','email'],
     include:[{
       model: Testpackage,
       as: "testPackages"
     }]
   })
   res.status(200).send({success:true,data:profile.testPackages,msg:"paquetes creados por el usuario logueado enviados."})
  }
);
/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

module.exports = router;
