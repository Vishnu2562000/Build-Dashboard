const mongoose = require("mongoose");
const { emailValidator, passwordvalidator } = require("../helpers/validators");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: "string",
      required: [true, "Email is Required"],
      unique: true,
      validate: [emailValidator, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: [
        passwordvalidator,
        "password must have atleast One Capital Number,One small number, Symbol, number and length should be atleast 10 charecters",
      ],
    },
  },
  { timestamps: true }
);
const hashPassword = async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
};
userSchema.pre("save", hashPassword);
const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
