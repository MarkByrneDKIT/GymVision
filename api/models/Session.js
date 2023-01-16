const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    repCount:{
        type:Number
    }
    // sessionId:{
    //     type:String,
    //     required:true,
    //     max:50,
    //     unique:true
    // }
},
{timestamps:true}
);

module.exports = mongoose.model("Session", SessionSchema)