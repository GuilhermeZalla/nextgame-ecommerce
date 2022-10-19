# Ecommerce Website (Next Game) / Responsive

A simple Ecommerce website built with MERN stack. MongoDB used for the backend with Nodejs and Express to store user data for authentication, purchases, wishlist and user data.

React Router used for navigation. 


## Home Page

![App Screenshot](https://i.imgur.com/LRAShXk.png)

![App Screenshot](https://i.imgur.com/x8bASzT.png)

> User can favorite a product to wishlist by clicking on a empty heart.

**Wishlist (Mongoose Schema):**

```
{
    name: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
}
```

## Product Page

![App Screenshot](https://i.imgur.com/UAVW6h8.png)

> Clicking on add to cart will add the current item/product to the shopping cart.

**Shopping Cart:**

```
{
    id:{
       type: Number,
       required: true,
    },
      name: {
        type: String,
        required: true,
        unique: false
    },
      price: {
        type: Number,
        required: true,
        unique: false
    },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Account'
   }
}
```

## Login/Signup Page

![App Screenshot](https://i.imgur.com/QckamzV.png)

![App Screenshot](https://i.imgur.com/VS3hKlP.png)

> User can signup by clicking **Sign Up** and opening the sing up tab
> If the user already has an account, it's possible to just login by 
> the login tab and then **Sign In**.

**Account (Mongoose Schema):**

```
{
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
}
```

## Checkout Pages


## Stack used

**Front-end:** Javascript, React, React Router, SASS

**Back-end:** NodeJs, ExpressJs, Mongoose

**Database**: MongoDB


## Possible Future Additions

* Third Party Payment Integration
* Third Party Auth like Google, Facebook, Twitter, etc
* Recaptcha for security
* Recommendations/Frequently Bought Together
* Forgot Password
* For-You-Page based on favorites and previous orders
* Dashboard for users
