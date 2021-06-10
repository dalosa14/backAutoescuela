const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const key = "123123";
const User = require("../db/models/user.js");
const Testpackage = require("../db/models/testPackage.js");
const { isAValidToken } = require("../middlewares/validations.js");
const validateEmail = require("../validations/validateEmail.js");
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
router.post("/register", async (req, res) => {
  try {
    let { username, email, password, rePassword } = req.body;
    if (
      !username  ||
      !email  ||
      !password  ||
      !rePassword 
    ) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Hay campos vacios",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "La contraseña debe contener al menos 8 carácteres",
      });
    }
    if (password !== rePassword) {
    }
    // Check for the unique Username
    let userUsername = await User.findOne({ where: { username: username } });
    if (userUsername) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "El usuario ya ha sido utilizado.",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "No es un email valido",
      });
    }

    // Check for the Unique Email
    let userEmail = await User.findOne({ where: { email: email } });
    if (userEmail) {
      console.log(userEmail);
      return res.status(400).json({
        success: false,
        data: null,
        msg: "El email introducido ya está en uso.",
      });
    }

    // The data is valid and new we can register the user
    let newUser = {
      username,
      password,
      email,
    };
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        User.create(newUser).then(() => {
          return res.status(201).json({
            success: true,
            data: newUser.email,
            msg: "Registro correcto.",
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: error,
      msg: "error",
    });
  }
});
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
router.post("/login", (req, res) => {
  try {
    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          msg: "Credenciales incorrectas.",
          data: null,
          success: false,
        });
      }
      // If there is user we are now going to compare the password

      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // User's password is correct and we need to send the JSON Token for that user
          const payload = {
            id: user.id,
          };
          jwt.sign(
            payload,
            key,
            {
              expiresIn: 604800,
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                data: {
                  user: { email: user.email, name: user.name },
                  token: `Bearer ${token}`,
                },
                msg: "Inicio de sesión completado",
              });
            }
          );
        } else {
          return res.status(400).json({
            msg: "Credenciales incorrectas.",
            success: false,
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
router.get("/isAuthenticated", isAValidToken, async (req, res) => {
  try {
    let profile = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email"],
    });
    res
      .status(200)
      .send({
        success: true,
        data: profile,
        msg: "perfil enviado correctamente",
      });
  } catch (error) {
    res
      .status(200)
      .send({ success: false, data: null, msg: "no es un token valido" });
  }
});
module.exports = router;
