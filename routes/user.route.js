const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { register, login } = require("../controller/user.controller");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

module.exports = userRouter;
