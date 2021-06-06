var jwt = require("jsonwebtoken");
const express = require("express");
const key = "123123";
const router = express.Router();
const User = require("../db/models/user");

const isAValidToken = async function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  var { id } = jwt.verify(token, key);
  let user = await User.findOne(
    {
      where: {
        id,
      },
      attributes: ["id", "username", "email"],
    },
    { raw: true }
  );
  console.log(user);
  if (user) {
    req.user = user.dataValues;
  }
  next();
};
module.exports = { isAValidToken };
