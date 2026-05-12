exports.validateRegister=(req,res,next)=>{

    try{
        const {name,email,password,phone} = req.body;

        if(!name||!email||!password||!phone){
            res.json({
                message:"All fields are required"
            });
        }

        next();
    
    }catch(error){
        res.json({
            message:error.message
        });
    }

    
}

