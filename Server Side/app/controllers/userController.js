const { tokenGeneration } = require("../helpers/tokengeneration");
const usersModel = require("../models/users");
const _ = require("lodash");
const usersController = {};
const bcrypt = require("bcrypt");
usersController.register = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  try {
    const user = await new usersModel(body).save();
    console.log(user);
    res.json(_.pick(user, ["_id", "email", "createdAt"]));
  } catch (err) {
    if (err["keyValue"]) {
      const errMessage = Object.keys(err["keyValue"]).includes("email");
      res.json({
        errors: errMessage
          ? "This email already exists please login"
          : "This username alredy exists",
      });
    } else {
      res.json(err);
    }
  }
};
usersController.login = async (req, res) => {
  const { body } = req;
  try {
    try {
      const user = await usersModel.findOne({ email: body.email });
      if (!user) {
        res.json({ errors: "Invalid Email or Password" });
      } else {
        const isValidPassword = await bcrypt.compare(
          body.password,
          user.password
        );
        // console.log("isValidPassword",isValidPassword);
        if (isValidPassword) {
          const expiresIn = "1d";
          const token = tokenGeneration(user, req, expiresIn);
          res.json({ token: `Bearer ${token}` });
        } else {
          res.json({ errors: "Invalid Email or Password" });
        }
      }
    } catch (err) {
      // console.log("inside",err)
      res.status(400).json(err);
    }
  } catch (err) {
    // console.log("outside err",err)
    res.json(err);
  }
};

module.exports = usersController;
