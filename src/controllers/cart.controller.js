const cartService = require("../services/cart.service");

exports.getCart = async(req,res)=>{
    try{
        const data = await cartService.getCart(req.user.id);

        res.status(200).json({
            success:true,
            message:"Cart fetched successfully",
            data:data,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
              error:{
                 "statusCode":error.statusCode||500,
                 "isOperational": error.isOperational || false            }
        })
    }
}


exports.addToCart = async(req,res)=>{
    try{

        const {bookId,quantity} = req.body || {};
        const data = await cartService.addToCart(req.user.id,{bookId,quantity});

        res.status(200).json({
            success:true,
            message:" product added to cart successfully",
            data:data,
            error:{}
        })

    }catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
              error:{
                 "statusCode":error.statusCode||500,
                "isOperational": error.isOperational || false
            }
        })
    }
}

exports.updateCartItem =async(req,res)=>{
    try{

        const {cartItemId} = req.params;
        const {quantity} =req.body;

        const data = await cartService.updateCartItem(req.user.id,cartItemId,quantity);

           res.status(200).json({
            success:true,
            message:" Cart item updated successfully",
            data:data,
            error:{}
        })

    }catch(error){

        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
              error:{
                 "statusCode":error.statusCode||500,
                "isOperational": error.isOperational || false
            }
        })
    }
}

exports.removeCartItem=async(req,res)=>{
    try{

        const {cartItemId} = req.params;
        
        const data = await cartService.removeCartItem(req.user.id,cartItemId);

        res.status(200).json({
            success:true,
            message:" Cart item removed successfully",
            data:data,
            error:{}
        })
    }catch(error){

         res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
              error:{
                 "statusCode":error.statusCode||500,
                "isOperational": error.isOperational || false
            }
        })
    }
}