const mongoose = require("mongoose");
const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  isLogged: {
    type: Boolean,
    required: false,
    unique: false,
    default: false,
  },
  cart: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
  ],
  wishlist: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Wishlist"
    }
  ]
});

module.exports = mongoose.model("Account", accountSchema, "accounts");
