const userRepository = require("../repositories/user.repository");
const cartRepository = require("../repositories/cart.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser=async(data)=>{
    
        const existingUser = await userRepository.findUserByEmail(data.email);

        if(existingUser){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password,10);
        data.password = hashedPassword;

        const user = await userRepository.createUser(data);

        const cart = await cartRepository.createCart(user._id);
        
        return user;
   
};

exports.loginUser = async(data)=>{
    
        const {email,password} = data;

        if(!email || !password){
           throw new Error("email and password required");
        }

        const user  = await userRepository.findUserByEmail(email);



        if(!user){
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new Error("Invalid credentials");
        }


        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.SECRET_TOKEN,
             {
                expiresIn: "24h"
            }
        );

      
      return{
        user,
        token
      }
    
};


exports.getMe = async(userId) =>{
    const  user  = await userRepository.getMe(userId);
    
    if(!user){
        throw new Error("user not found");
    }

    return user;
} 
