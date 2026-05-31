const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const orderItemSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    orderId:{
        type:String,
        ref:"Order",
        required:true
    },
    bookId:{
        type:String,
        ref:"Book",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

orderItemSchema.pre("save",async function(){

    if(this.isNew){
        let typeCode = "IT";

        this._id = await generateCustomId(
            "orderItem_sequence_id",
            "OIT",
            typeCode,
            3
        );
    }

})

const OrderItem  = mongoose.model("OrderItem",orderItemSchema);

module.exports=OrderItem;