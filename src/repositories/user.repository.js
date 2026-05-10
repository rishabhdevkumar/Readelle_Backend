const User = require("../schemas/User");

exports.createUser=async(data)=>{
    try{
        return await User.create(data);
    }catch(error){
        throw new Error(`Error creating user : ${error.message}`);
    }
};

exports.findUserByEmail=async(email)=>{
    try{
        return await User.findOne({email});
    }catch(error){
        throw new Error("Error finding user");
    }
};