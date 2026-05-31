const OrderItem = require("../schemas/OrderItem");

exports.create = async(data)=>{
    return await OrderItem.create(data);
};

exports.findById = async(orderItemId)=>{
    return await OrderItem.findById(orderItemId);
};

exports.findByOrder = async(orderId)=>{
    return await OrderItem.find({orderId}).populate("bookId");
};  


