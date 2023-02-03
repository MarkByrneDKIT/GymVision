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