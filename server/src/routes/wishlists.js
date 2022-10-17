const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const Wishlist = require("../models/wishlist");
const Cart = require("../models/carts");

// GET

router.get("/user_wishlist/:email", async (req, res) => {
  try {
    let user = await Account.findOne({ email: req.params.email });
    let wishlist = await Wishlist.find({ user: user._id });
    res.json(wishlist);
  } catch (err) {
    res.sendStatus(500);
    console.log(`New Error: ${err}`);
  }
});

module.exports = router;