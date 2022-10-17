# Ecommerce Website (Next Game)

A Ecommerce website built with MERN stack. MongoDB used for the backend with Nodejs and Express to store user data for authentication, purchases, wishlist and user data.

React Router used for navigation. 

## Home Page

![App Screenshot](https://imgur.com/QGVOk0E.png)

![App Screenshot](https://imgur.com/X4QelnH.png)

> User can favorite a product to wishlist by clicking on a empty heart.

**Favorite (Mongoose Schema):**

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

![App Screenshot](https://imgur.com/QckamzV.png)

![App Screenshot](https://imgur.com/VS3hKlP.png)

> User can signup by clicking **Sign Up** and opening the sing up section
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
