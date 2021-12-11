const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userAssetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantityPurchased: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  datePurchased: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  data: {
    assets: { type: [userAssetSchema], default: [] },
  },
  password: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "$",
  },
});

userSchema.pre("save", function (next) {
  try {
    //if the password has not been changed, one need not do anything if the user is to be resaved in so far as modifying the password is concerned
    if (!this.isModified("password")) {
      return next();
    }
    const passwordHashed = bcrypt.hashSync(this.password, 10);
    //re-assign hashed version over original
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compareSync(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
const UserAsset = mongoose.model("UserAsset", userAssetSchema);

module.exports.User = User;
module.exports.UserAsset = UserAsset;
