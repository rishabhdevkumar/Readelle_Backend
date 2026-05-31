const orderService = require("../services/order.service");

exports.createOrder = async(req,res)=>{
    try{

        const data = await orderService.createOrder(req.user.id,req.body);

        res.status(201).json({
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

exports.getMyOrders = async(req,res)=>{
    try{
        const data = await orderService.getMyOrders(req.user.id);

        res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            data:data,
            error:{}

        });
    
    }catch(error){

        res.status(error.statusCode||500).json({
            success:false,
            message:error.message,
            data:{},
            error:{
                "statusCode":error.statusCode||500,
                "isOperational":error.isOperational||false
            }
        });
    }
};

exports.getOrderById = async(req,res)=>{
    try{

        const orderId = req.params.orderId;
        const userId = req.user.id;

        const data = await orderService.getOrderById(orderId,userId);

        res.status(200).json({
            success:true,
            message:"Order fetched successfully",
            data:data,
            error:{}
        });
    
    }catch(error){
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message,
            data:{},
            error:{
                "statusCode":error.statusCode||500,
                "isOperational":error.isOperational||false
            }
        });
    }
};

exports.updateStatus=async(req,res)=>{
    try{

           const orderId = req.params.orderId;
           const {status} = req.body;

        const data = await orderService.updateStatus(orderId,status);

        res.status(200).json({
            success:true,
            message:"Order updated successfully",
            data:data,
            error:{}
        });
    
        
    }catch(error){
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message,
            data:{},
            error:{
                "statusCode":error.statusCode||500,
                "isOperational":error.isOperational||false
            }
        });
    }
};

exports.cancelOrder=async(req,res)=>{
    try{

        const orderId = req.params.orderId;
        const userId = req.user.id;

        const data = await orderService.cancelOrder(orderId,userId);

          res.status(200).json({
            success:true,
            message:"Order cancelled successfully",
            data:data,
            error:{}
        });        
    
    }catch(error){
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message,
            data:{},
            error:{
                "statusCode":error.statusCode||500,
                "isOperational":error.isOperational||false
            }
        });
    }
}