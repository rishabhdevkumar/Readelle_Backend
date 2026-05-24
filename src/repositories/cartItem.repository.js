const cartItem = require("../schemas/cartItem");
const CartItem  = require("../schemas/cartItem");


exports.createItem =async(data)=>{
    return await CartItem.create(data);
};

exports.findItem = async(cartId,bookId)=>{
    return await CartItem.findOne({cartId,bookId});
};


exports.findById = async(cartItemId)=>{
    return await CartItem.findById(
        cartItemId
    );
};

exports.getCartItems = async(cartId)=>{
    return await CartItem.find({cartId}).populate("bookId");
};

exports.updateQuantity = async(cartItemId,quantity)=>{
    return await CartItem.findByIdAndUpdate(
        cartItemId,
        {quantity},
        {new:true}
    );
};

exports.deleteItem =async(cartItemId)=>{
    return await cartItem.findByIdAndDelete(cartItemId);
};