const router = require("express").Router();
const User = require("../models/User");


//Register
router.post("/register", async (req,res)=>{

    try{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    
    const user = await newUser.save();
    res.status(200).json(user);
    }
    
 catch(err) {
             console.log(err);
            }

});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        !email && res.status(404).send("User does not exist");

        const password = await User.findOne({ password: req.body.password });
        !password && res.status(400).json("Incorrect password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;