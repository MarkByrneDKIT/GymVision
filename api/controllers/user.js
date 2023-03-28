const User = require("../models/user");
 
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";


exports.signup = async (req, res, next)=>{

    const {email, password} = req.body
        try {
            const user = await User.signup(email, password)

            res.status(200).json({email,user})
        } catch (error) {
res.status(400).json({error: error.message})
        }
    }
   // const userExist = await User.findOne({email});
    
    // if (userExist){
      
    //  return  next(new ErrorResponse('E-mail already exists', 400))
    // }

 //   try {
   //     const user = await User.create(req.body);
   //     res.status(201).json({
   //         success: true,
   //         user
   //     })
        
  //  } catch (error) {
  //      console.log(error);
  //      next(error);
        
   // }
   
   const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  
  export const authenticateUser = async (req, res, next) => {
    const { token } = req.body;
  
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audient: `${process.env.GOOGLE_CLIENT_ID}`,
    });
  
    const payload = ticket.getPayload();
  
    let user = await User.findOne({ email: payload?.email });
    if (!user) {
      user = await new User({
        email: payload?.email,
        password: payload?.picture,
        name: payload?.name,
      });
  
      await user.save();
    }
  
    res.json({ user, token });
  };
  
exports.signin = async (req, res, next)=>{

    try{
        const {username, password} = req.body;
        if(!username || !password){
       
            return  next(new ErrorResponse('username and password are required', 400))
        }

        // check user e-mail
        const user = await User.findOne({username});
        if(!user){
           //add failed login attempt here
            return  next(new ErrorResponse('Invalid credentials', 400))
        }
        //return {
        //    ...state,
        //    failedLoginAttempts: state.failedLoginAttempts + 1
       // }
    
        // verify user password
        // take plaintext and hash it and then compare the hash in the database to the plaintext entered
        const isMatched = await user.comparePassword(password);
        if (!isMatched){
         //add to the limit for password count
          return  next(new ErrorResponse('Invalid credentials', 400))
        }
//Reset limit to 0 here
        generateToken(user, 200, res);
    }
    catch(error){
        console.log(error);
       
        next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }
   
}


const generateToken = async (user, statusCode, res) =>{

    const token = await user.jwtGenerateToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
    };

    res
    .status(statusCode)
    .cookie('token', token, options )
    .json({success: true, token})
}


//LOG OUT USER
exports.logout = (req, res, next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}




exports.singleUser = async (req, res, next)=>{

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            sucess: true,
            user
        })
        
    } catch (error) {
        next(error)
        
    }
   
}