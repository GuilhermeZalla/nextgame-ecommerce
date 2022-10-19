const express = require("express");
const router = express.Router();
const Account = require("./../models/accounts");
const Cart = require("./../models/carts");
const Wishlist = require("./../models/wishlist");

// GET

router.get("/user_cart/:email", async (req, res) => {
  console.log(req.params.email);
  try{
   let user = await Account.findOne({email: req.params.email});
   let cart = await Cart.find({user: user._id});
   res.json(cart);
  }catch(err){
   res.sendStatus(500);
   console.error(`New error: ${err}`);
  }
});

router.get("/verify/:value", async (req, res) => {
   try{
      let result = await Account.findOne({$or:[{email: req.params.value}, {username: req.params.value}]});
      res.json(result);
   }catch(err){
    res.sendStatus(500);
    console.log(`New Error: ${err}`);
   }
});

router.get("/user_wishlist", async (req, res) => {
  try{
    let user = await Account.findOne({email: req.params.email});
    let wishlist = await Wishlist.find({user: user._id});
    res.json(wishlist);
  }catch(err){
    res.sendStatus(500);
    console.error(err);
  }
});

router.get("/username/:email", async (req, res) => {
    try{
      let user = await Account.find({email: req.params.email});
      res.json(user);
    }catch(err){
        res.sendStatus(500);
        console.error(`New error: ${err}`);
    }
});

router.get("/:email/:password", async (req, res) => {
  try {
    let user = await Account.find({
      email: req.params.email,
      password: req.params.password,
    });
    if (user.length === 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(`New error: ${err}`);
  }
});

//POST

router.post("/", async (req, res) => {
  console.log(req.body.email);
  try {
    await Account.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.passwordConfirm,
      username: req.body.username,
    });
    res.redirect("http://localhost:3000/validation");
  } catch (err) {
    res.sendStatus(500);
    console.error(`New error: ${err}`);
  }
});

router.post("/cart/:email/:id/:name/:price", async (req, res) => {
    try{
        let user = await Account.findOne({email: req.params.email});
        let cart = await Cart.create({
           id: req.params.id,
           name: req.params.name,
           price: req.params.price,
           user: user._id
        });
        res.json(cart);
    }catch(err){
      res.sendStatus(500);
      console.error(`New error: ${err}`);
    }
});

router.post("/wishlist/:email/:id/:name/:price", async (req, res) => {
    try{
      let user = await Account.findOne({email: req.params.email});
      let wishlist = await Wishlist.create({
          id: req.params.id,
          name: req.params.name,
          price: req.params.price,
          user: user._id
      });
      res.json(wishlist);
    }catch(err){
      res.sendStatus(500);
      console.error(`New error: ${err}`);
    }
});

// PATCH

router.patch("/:email/:status", async (req, res) => {
  try {
     await Account.findOneAndUpdate(
      { useremail: req.params.email },
      { isLogged: req.params.status}
    );
    res.json(`result: ${true}`);
  } catch (err) {
    res.sendStatus(500);
    console.error(`New error: ${err}`);
  }
});

// DELETE

router.delete("/remove-item/:email/:name", async (req, res) => {
    try{
      let user = await Account.findOne({email: req.params.email});
      let wishlist = await Wishlist.findOneAndRemove({name: req.params.name}, {user: user._id});
      res.json(wishlist);
    }catch(err){
      res.sendStatus(500);
      console.error(`New error: ${err}`);
    }
});

router.delete("/cart-remove/:email/:name", async (req, res) => {
    try{
      let user = await Account.findOne({email: req.params.email});
      let cart = await Cart.findOneAndRemove({name: req.params.name}, {user: user._id});
      res.json(cart);
    }catch(err){
      res.sendStatus(500);
      console.error(`New error: ${err}`);
    }
});

router.delete("/empty-cart/:email", async (req, res) => {
  try {
    let user = await Account.findOne({email: req.params.email});
    let cart = await Cart.deleteMany({user: user._id});
    res.json(cart);
  } catch (err) {
     res.sendStatus(500);
      console.error(`New error: ${err}`);
  }
});

module.exports = router;
