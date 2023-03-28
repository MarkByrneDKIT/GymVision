const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
 
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8, 
        
    },
    profilePicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    desc: {
        type: String,
        max: 50,
      },
    isAdmin:{
        type:Boolean,
        default:false
    },
  
}, {timestamps:true});



module.exports = mongoose.model("User", UserSchema);