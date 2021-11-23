const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userAssetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
});

userSchema.pre("save", function (next) {
  try {
    // generate a salt
    // const salt = await bcrypt.genSalt(10);
    // // generate a password hash (salt + hash )
    // const passwordHashed = await bcrypt.hash(this.password, salt);
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

userSchema.methods.isValidPassword = async function (newPassword, callback) {
  return callback(null, bcrypt.compareSync(newPassword, this.password));
  // try {
  //   return await bcrypt.compareSync(newPassword, this.password);
  // } catch (error) {
  //   throw new Error(error);
  // }
};

const User = mongoose.model("User", userSchema);
const UserAsset = mongoose.model("UserAsset", userAssetSchema);

module.exports.User = User;
module.exports.UserAsset = UserAsset;
