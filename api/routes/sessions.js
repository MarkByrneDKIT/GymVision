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


router.get("/session/:username", (req, res) => {
    const username = req.params.username;
    Session.find({ username }, (err, sessions) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(sessions);
      }
    });
  });

module.exports = router;