const orderRepo = require("../repositories/order.repository");
const orderItemRepo = require("../repositories/orderItem.repository");
const cartRepo =require("../repositories/cart.repository");
const cartItemRepo = require("../repositories/cartItem.repository");

exports.createOrder = async(userId,data)=>{

    const cart = await cartRepo.findCartByUser(userId);

   const items  = await cartItemRepo.getCartItems(cart._id);

   if(items.length === 0 ){
    throw new Error("Cart is empty");
   }

    let totalAmount = 0; 

    // cart.items.forEach((item)=>{
    //     totalAmount += item.bookId.price * item.quantity;
    // })

    for(const item of items){

    totalAmount +=
        item.bookId.price * item.quantity;

    }

    const order = await orderRepo.createOrder({
        user:userId,
        totalAmount,
    });

    for(const item of cart.items){
        await orderItemRepo.create({
            orderId:order._id,
            bookId:item.bookId,
            quantity:item.quantity,
            price:item.price
        });
    }

    cart.items = [];

    await cart.save();

    return{
        orderId:order._id,
        status:order.status,
        totalAmount:order.totalAmount,
        createdAt:order.createdAt
    };
};