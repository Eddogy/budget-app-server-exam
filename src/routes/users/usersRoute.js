const express = require("express");
const { registerUser, fetchUsersController, loginUserController } = require("../../controllers/users/usersController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUserController);
userRoute.get('/', fetchUsersController);

module.exports = userRoute;
