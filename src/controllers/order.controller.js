const orderService = require("../services/order.service");

exports.createOrder = async(req,res)=>{
    try{

        const data = await orderService.createOrder(req.user._id,req.body);

        res.status(200).json({
            success:true,
            message:"Order placed successfully",
            data:data,
            error:{}
        })

    }catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
            error:{
                "statusCode":error.statusCode || 500,
                "isOperational":error.isOperational || false
            }
        })
    }
};