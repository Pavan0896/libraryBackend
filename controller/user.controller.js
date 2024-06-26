const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = (req, res) => {
  const { userName, role, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send("Error while hashing");
      } else {
        const user = new UserModel({ userName, role, email, password: hash });
        await user.save();
        res.status(200).send({"msg":"New user registered successfully"});
      }
    });
  } catch (error) {
    res.status(500).send({"Internal error":error});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.send({"msg":"Error while comparing password"});
      }
      if (result) {
        const token = jwt.sign(
          { email: user.email, name: user.userName, role: user.role, id:user._id},
          process.env.JWT_SECRET
        );
        res.status(200).send({ msg: "Login successful", token: token });
      } else {
        res.send({"msg":"Wrong password"});
      }
    });
  } else {
    res.send({"msg":"Invalid credentials or invalid email"});
  }
};

module.exports = { register, login };
