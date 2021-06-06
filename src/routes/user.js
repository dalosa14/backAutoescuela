const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = "123123";
const User = require("../db/models/user");
const Testpackage = require("../db/models/testpackage");
const { isAValidToken } = require("../middlewares/validations");

router.post("/register", async (req, res) => {
  try {
    let { username, email, password, rePassword } = req.body;
    if (username === '' || email === ''|| password === ''|| rePassword === '') {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Hay campos vacios",
      });
    }
    if (password !== rePassword) {
      return res.status(400).json({
        success: false,
        data: null,
        msg: "Las contraseñas no coinciden.",
      });
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
            data: "asdasd@gsdf.com",
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
 * @swagger
 * /user/register:
 *   post:
 *     summary: registro.
 *     description: enviamos los datos de registro al servidor y si los datos son correctos se creará el usuario correspondiente.
 *     parameters:
 *       name: email
 *       required: true
 *       description: El email lde un usuario existente.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: nos devuelve la información de email y usuario agregados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "logueo compleatado"
 *                 data:
 *                   type: object
 *                   example: {user:object,token:string}
 *                   description: nos devuelve los datos que sean necesarios.
 *                 success:
 *                   type: boolean
 *                   description: nos dice si eel resultado es satisfactorio o no.
 *                   example: true | false
 */
router.post("/login", (req, res) => {
  try {
    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
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
                data: { user: {email: user.email,name: user.name}, token: `Bearer ${token}` },
                msg: "Inicio de sesión compleatado",
              });
            }
          );
        } else {
          return res.status(404).json({
            msg: "Credenciales incorrectas.",
            success: false,
          });
        }
      });
    });
  } catch (error) {}
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/profile",
  isAValidToken,
  async (req, res) => {
    
    
   let profile= await User.findByPk(req.user.id,{
     include:[{
       model: Testpackage,
       as: "testPackages"
     }]
   })
   res.status(200).send({success:true,data:profile,msg:"perfil enviado correctamente"})
  }
);
module.exports = router;
