const express = require("express");
const router = express.Router();
const User = require("../db/models/user.js");
const Testpackage = require("../db/models/testPackage.js");
const Test = require("../db/models/test.js");
const Question = require("../db/models/question.js");
const Answer = require("../db/models/answer.js");
const { isAValidToken } = require("../middlewares/validations.js");
const validateUrl =require("../validations/validateUrl.js")

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
  res.status(201).json({ success: true,data:test,msg:'test creado' });
});
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
router.post("/createAnswer", isAValidToken, async (req, res) => {
  try {
    let { isTrue, answer, questionId } = req.body;
    if(   !answer || !questionId ){
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Hay campos vacios",
      });
    }
  let answerPayload = {
    answer,
    
    isTrue,
   
  };
  let answerObject = await Answer.create(answerPayload);
  answerObject.setQuestion(questionId)
  res.status(200).json({ success: true,data:answerObject,msg:'respuesta creada' });
  } catch (error) {
    res.status(400).json({ success: false,data:null,msg:'Error al crear la respuesta' });

  }
  
});
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
router.post("/addTestPackageToUser", isAValidToken, async (req, res) => {
  let { packageId } = req.body;
try {
   let user = await User.findOne({where:{id:req.user.id}})
  let testpackage = await Testpackage.findOne({where:{id:packageId}})
  console.log(user,testpackage);
  let added = user.addTestPackageToUser(testpackage)
 
  res.status(201).json({ success: true,data:null,msg:'paquete añadido' });
} catch (error) {
  res.status(400).json({ success: true,data:null,msg:'error al añadir el pack de test al usuario' });

}
 
});

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
router.get("/getAllTestPackages", async (req, res) => {
  try {
     let testspackages = await Testpackage.findAll()
  res.status(200).json({ success: true ,data:testspackages,msg:'paquetes enviados'});
  } catch (error) {
    res.status(400).json({ success: true ,data:null,msg:'error'});
  }
 
});
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
router.get("/getBuyedTestPackages",isAValidToken, async (req, res) => {
  try {
    let user = await User.findOne({where:{id:req.user.id}})
  let testPackages = await  user.getTestPackageToUser()

  res.status(200).json({ success: true ,data:testPackages,msg:'paquetes comprados disponibles'});
  } catch (error) {
    res.status(400).json({ success: true ,data:null,msg:'error'});

  }
  
});
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
router.get("/getAllTestsOfPackage/:id",isAValidToken, async (req, res) => {
  try {
    let packageId = req.params.id
    let testpackage = await Testpackage.findOne({where:{id:packageId}})
     let tests = await testpackage.getTests()
    res.status(200).json({ success: true ,data:tests,msg:'tests del pack de tests enviados correctamente'});
  } catch (error) {
    res.status(200).json({ success: true ,data:null,msg:'error'});

  }

});
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
