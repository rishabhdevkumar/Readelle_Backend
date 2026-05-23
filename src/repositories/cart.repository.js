const Cart = require("../schemas/Cart");

exports.createCart = async(userId)=>{
    return await Cart.create({userId});
};

exports.findCartByUser = async(userId)=>{
    return await Cart.findOne({userId});
};
