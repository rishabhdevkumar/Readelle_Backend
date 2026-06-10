const Order = require("../schemas/Order");

exports.createOrder =async(data)=>{
    return await Order.create(data);
};

exports.findById=async(orderId)=>{
    return await Order.findById(orderId);
};

exports.findByUser= async(userId)=>{
    return await Order.find({userId:userId}).sort({createdAt:-1});
};

exports.findOne =async(filter)=>{
    return await Order.findOne(filter);
};

exports.updateStatus = async(orderId,status)=>{
    return await Order.findByIdAndUpdate(
         orderId,
        {status},
        {returnDocument:"after"}
    )
};

exports.findAllOrders = async () => {
    return await Order.find({})
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .lean();
};

exports.deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};
