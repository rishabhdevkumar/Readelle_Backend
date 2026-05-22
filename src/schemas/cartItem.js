const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const cartItemSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    cartId:{
        type:String,
        ref:"Cart",
        required:true
    },
    bookId:{
        type:String,
        ref:"Book",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
},{timestamps:true}
);


cartItemSchema.pre("save",async function(){

    if(this.isNew){

        this._id =await generateCustomId(
            "cart_item_sequence_id",
            "CI",
            "CT",
            3
         );
    }
});

const cartItem = mongoose.model("CartItem",cartItemSchema) ;

module.exports = cartItem;

