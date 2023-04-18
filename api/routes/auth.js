const router = require("express").Router();
const { rawListeners } = require("../models/User");
const User = require("../models/User");
const bcrypt = require('bcrypt');
 

//Register
router.post("/register", async (req,res)=>{
 
  try{
    
  
    const newUser = new User({
      
      username: req.body.username,
      email: req.body.email,
      //Hash the request password(req.body.password and set it to the variable password.
      password: req.body.password,
      securityQuestion: req.body.securityQuestion,
      securityAnswer: req.body.securityAnswer      
    });
    // if (!isCaptchaVerified) {
    //   ("Error please try again")
    //   return;
    // }
   
    const user = await newUser.save();
    res.status(200).json(user);
      }
 catch(err) {
             console.log(err);
            }
          
          });
     //Hashing here just for new user.
     //Password validation here
     // timeout before a callback is called
   
 
    //if statement here for email validation
   // 1 FOR EMAIL HERE // res.status(400).send("Email is invalid");
   //if req.body.email ! = regex for email
    // 1 FOR PASSWORD HERE res.status(400).send("Password is invalid"); if statement here for password validation.
    //if req.body.password ! =  regex for email



    //res.status(404).send("User does not exist");
   
    
        

//LOGIN
//Hashing here
router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;

    if (loginAttempts[username] && loginAttempts[username].attempts >= maxAttempts) {
      const timeSinceLastAttempt = Date.now() - loginAttempts[username].timestamp;

      if (timeSinceLastAttempt < resetTime) {
        return res.status(429).json("Too many login attempts. Please try again later.");
      } else {
        loginAttempts[username].attempts = 0;
      }
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User does not exist");
      return;
    }

    const password = await User.findOne({ password: req.body.password });
    if (!password) {
      if (!loginAttempts[username]) {
        loginAttempts[username] = { attempts: 1, timestamp: Date.now() };
      } else {
        loginAttempts[username].attempts += 1;
        loginAttempts[username].timestamp = Date.now();
      }
      res.status(400).json("Incorrect password");
      return;
    }

    // If successful login, reset the attempts counter
    loginAttempts[username] = { attempts: 0, timestamp: Date.now() };

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;