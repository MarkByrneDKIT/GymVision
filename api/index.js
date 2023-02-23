const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const sessionRoute = require("./routes/sessions");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log("Connected to MongoDB")
})


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/sessions", sessionRoute)

app.listen(8800, () =>{
    console.log("Backend Server running.");
});
