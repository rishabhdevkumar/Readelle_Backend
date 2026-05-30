const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
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

orderItemSchema.pre = ("save",async function(){

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