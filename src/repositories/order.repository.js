const Order = require("../schemas/Order");

exports.createOrder =async(data)=>{
    return await Order.create(data);
};

exports.findById=async(orderId)=>{
    return await Order.findById(orderId);
};

exports.findByUser= async(userId)=>{
    return await Order.find({user:userId}).sort({createdAt:-1});
};

exports.findOne =async(filter)=>{
    return await Order.findOne(filter);
};

exports.updateStatus = async(orderId,status)=>{
    return await Order.findByIdAndUpdate(
         orderId,
        {status},
        {new:true}
    )
};
