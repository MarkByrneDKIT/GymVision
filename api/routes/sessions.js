const router = require("express").Router();
const Session = require("../models/Session");
 
//Post session
router.post("/session", async (req,res)=>{

    try{
    const newSession = new Session({
        username: req.body.username,
        repCount: req.body.repCount,
        setCount: req.body.setCount
    });

    
    const session = await newSession.save();
    res.status(200).json(session);
    }
        
 catch(err) {
    console.log(err);
   }

});




const verifyUserLogin = async (email,password)=>{
  try {
      const user = await User.findOne({email}).lean()
      if(!user){
          return {status:'error',error:'user not found'}
      }
      if(await bcrypt.compare(password,user.password)){
          // creating a JWT token
          token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
          return {status:'ok',data:token}
      }
      return {status:'error',error:'invalid password'}
  } catch (error) {
      console.log(error);
      return {status:'error',error:'timed out'}
  }
}

// login 
router.get('/register',async(req,res)=>{
  const {email,password}=req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(email,password, username);
  if(response.status==='ok'){
      // storing our JWT web token as a cookie in our browser
      res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
      res.redirect('/');
  }else{
      res.json(response);
  }
})


  

router.get("/session/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const sessions = await Session.find({ username });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


  router.get("/session/:username/:id", (req, res) => {
    const username = req.params.username;
    const id = req.params.id;
  
    Session.findOne({ username: username, _id: id })
      .then((session) => {
        if (!session) {
          return res.status(404).json({ msg: "Session not found" });
        }
        res.json(session);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
      });
  });
  

module.exports = router;