const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const cartSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    userId:{
        type:String,
        ref:"User",
        required:true,
        unique:true,
       
    }
},{timestamps:true}
);


cartSchema.pre("save",async function(){
    if(this.isNew){
        this._id = await generateCustomId(
            "cart_sequence_id",
            "CRT",
            "CT",
            3
        );
    }
});

const cart = mongoose.model("Cart",cartSchema);

module.exports = cart; 