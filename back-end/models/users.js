const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // generate a password hash (salt + hash )
    const passwordHashed = await bcrypt.hash(this.password, salt);

    //re-assign hashed version over original
    this.password = passwordHashed;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
