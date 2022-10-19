const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
     id:{
        type: Number,
        required: true,
        unique: true
     },
     name: {
        type: String,
        required: true,
        unique: false
     },
     quant: {
        type: Number,
        required: false,
        unique: false,
        default: 1
     },
     price: {
        type: Number,
        required: true,
        unique: false
     },
     user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Account'
     }
});

module.exports = mongoose.model('Cart', cartSchema, 'carts');