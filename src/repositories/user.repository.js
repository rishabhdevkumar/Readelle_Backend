const User = require("../schemas/User");

exports.createUser=async(data)=>{
         return await User.create(data);
};

exports.findUserByEmail=async(email)=>{
        const user = await User.findOne({email});
        return user;
};