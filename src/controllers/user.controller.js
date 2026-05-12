const userService = require("../services/user.service");

exports.registerUser = async(req, res) => {

    try{

        const user = await userService.registerUser(req.body);

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            error:{}
        })
    }catch(error){
       
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "User with this email already exists",
            data: {},
            error: {
                "statusCode":error.statusCode||409,
                "isOperational":true
            }
        })
    }
}


exports.loginUser = async(req,res)=>{
    try{

        const data = await userService.loginUser(req.body);

        res.status(200).json({
            success:true,
            message:"Login successfully",
            data:{
                "id":data.user._id,
                "name":data.user.name,
                "email":data.user.email,
                "role":data.user.role,
                token:data.token,
            },


            error:{}
        });

    }catch(error){
        res.status(error.statusCode||500).json({
            success:false,
            message:"Invalid email or password",
            data:{},
            error:{
                 "statusCode":error.statusCode||409,
                "isOperational":true
            }
        })
    }
}
