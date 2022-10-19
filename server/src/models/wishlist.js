const mongoose = require('mongoose');
const wishlistSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Wishlist', wishlistSchema, 'wishlists');