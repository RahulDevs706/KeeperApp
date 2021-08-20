require('dotenv').config();
const express =require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());

const dbUserName = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;

const port = process.env.PORT || 5000;


mongoose.connect("mongodb+srv://"+dbUserName+":"+dbPassword+"@cluster0.k3cmr.mongodb.net/NoteKeeperDb?retryWrites=true&w=majority",
{
    useNewUrlParser:true, 
    useCreateIndex:true, 
    useUnifiedTopology:true, 
    useFindAndModify:true
}, (err)=>{
    if(!err){
        console.log("Succesfully connected to db");
    }else{console.log(err);}
});

const userRouter = require("./routes/User");
app.use("/user", userRouter);


if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client","build", "index.html"))
    })
}




app.listen(port, ()=>{
    console.log("express server started");
});