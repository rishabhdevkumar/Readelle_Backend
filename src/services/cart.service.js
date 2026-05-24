const cartRepo = require("../repositories/cart.repository");
const cartItemRepo = require("../repositories/cartItem.repository");
const bookRepo = require("../repositories/book.repository");

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
            quantity:item.quantity,
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

    if(quantity<1){
        throw new Error("Qunatity must be at least 1");
    }


    const book =await bookRepo.findBookByIdRepository(bookId);

    if(!book){
        throw new Error("Book not found");
    }

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

    const cart = await cartRepo.findCartByUser(userId);

    const item = await cartItemRepo.findById(cartItemId);

    if(!item){
        throw new Error("cart item not found");
    }

    if(item.cartId !== cart._id){
        throw new Error("Unauthorized access");
    }

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
     const cart = await cartRepo.findCartByUser(userId);

    const item = await cartItemRepo.findById(cartItemId);

    if(!item){
        throw new Error("Cart item not found");
    }

    if(item.cartId !== cart._id){
        throw new Error("Unauthorized access");
    }

    await cartItemRepo.deleteItem(cartItemId);
}