const router = require("express").Router();
const { rawListeners } = require("../models/User");
const User = require("../models/User");
const bcrypt = require('bcrypt');
     var attempt = 3; 
     
    function resetAll(){
    	attempt = 3;
    	document.getElementById("username").disabled=false;
    	document.getElementById("password").disabled=false;
    	document.getElementById("login").disabled=false;
    	document.getElementById("msg").innerHTML="";
    	document.getElementById("reset").style.display="none";
    }
     
     
    function userLogin(){
    	var username = document.getElementById("username").value;
    	var password = document.getElementById("password").value;
     
    	if(username=="" || password==""){
    		alert ("Please complete the required field!");
    	}else{
    		if (username == "admin" && password == "admin"){
    			alert ("Login successfully");
    		}else{
    			attempt --;
    			document.getElementById("msg").innerHTML="<center class='text-danger'>Invalid username or password</center>";
    			alert("You have left "+attempt+" login attempt;");
    			if(attempt == 0){
    				document.getElementById("username").disabled=true;
    				document.getElementById("password").disabled=true;
    				document.getElementById("login").disabled=true;
    				document.getElementById("reset").style.display="inline";
    			}
    		}
    	}
    }
 
//Register
router.post("/register", async (req,res)=>{
 
  try{
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      //Hash the request password(req.body.password and set it to the variable password.
      password: req.body.password
    });
        
   
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
      
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).send("User does not exist");
        
    //Hashing here, comparing hashes etc
    //Set new variable 
    // const hashedpassword = hashPassword(req.body.password);
    //const password = await User.findOne({ password: hashedpassword });

        const password = await User.findOne({ password: req.body.password });
        !password && res.status(400).json("Incorrect password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    
      }
    })
    
module.exports = router;