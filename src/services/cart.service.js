const cartRepo = require("../repositories/cart.repository");
const cartItemRepo = require("../repositories/cartItem.repository");


exports.getCart = async(userId)=>{
    let cart = await cartRepo.findCartByUser(userId);

    if(!cart){
        cart = await cartRepo.createCart(userId);
    }

    const items = await cartItemRepo.getCartItems(cart._id);

    let totalAmount = 0;
    let totalItem = 0;

    const formattedItems = items.map(item=>{

          if (!item.bookId) {
            return null;
        }
        const subtotal = item.bookId.price * item.quantity;

        totalAmount += subtotal;
        totalItem += item.quantity;

        return{
            cartItemId:item._id,
            book:item.bookId,
            quatity:item.quatity,
            subtotal
        }
    })


    return {
        cartId:cart._id,
        items:formattedItems,
        totalItem,
        totalAmount
    }
}


exports.addToCart = async(userId,data)=>{

    const {bookId,quantity = 1}=data;

    let cart  = await cartRepo.findCartByUser(userId);

    if(!cart){
        cart = await cartRepo.createCart(userId);
    }

    const existingItem = await cartItemRepo.findItem(cart._id,bookId);

    if(existingItem){
        existingItem.quantity += quantity;
        await existingItem.save();

        return existingItem;
    }

    return await cartItemRepo.createItem({
        cartId: cart._id,
        bookId,
        quantity
    })
}


exports.updateCartItem = async(userId,cartItemId,quantity)=>{

    if(quantity === 0){
        await cartItemRepo.deleteItem(cartItemId);
        return {message:"Item removed"};
    }

    return await cartItemRepo.updateQuantity(
        cartItemId,
        quantity
    )
};

exports.removeCartItem = async(userId,cartItemId)=>{
    await cartItemRepo.deleteItem(cartItemId);
}