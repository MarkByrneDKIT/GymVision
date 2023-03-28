const router = require("express").Router();
const User = require("../models/User");
router.get("/", (req,res)=>{
    res.send("hi")});
  
//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });

 
  
  //delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });


module.exports = router;