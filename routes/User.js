require('dotenv').config();
const express = require ("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/usersDb");
const Note = require("../models/notesDb");

const secretKey = process.env.USER_ENCRYPTION_KEY;


const signToken = userID=>{
    return JWT.sign({
        iss:"Keeper",
        sub: userID
    }, secretKey, {expiresIn:"24h"});
}


userRouter.post("/register", (req,res)=>{
    const {username, password, fullName} = req.body;

    User.findOne({username},(err, user)=>{
        if(err)
            res.status(500).json({message : {msgBody: "Error has been occured", msgError:true}});
        if(user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else{
            const newUser = new User({username, password, fullName});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account succesfully created, please login to continue.", msgError: false } });

            });
        }
        
        
    });
});

userRouter.post("/login",passport.authenticate("local",{session:false}), (req, res) => {
    
            if (req.isAuthenticated()) {
                const { _id, username, fullName } = req.user;
                const token = signToken(_id);
                res.cookie("access_token", token, { httpOnly: true, sameSite: true });
                res.status(200).json({ isAuthenticated: true, user: { username, fullName } });
            }
});

userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({user:{username : ""}, success:true});
});

userRouter.post("/note", passport.authenticate("jwt", { session: false }), (req, res) => {
    
    const note = new Note(req.body);
    note.save(err=>{
        if(err)
            res.status(500).json({ message: { msgBody: "Cannot add an empty note, please add content to it", msgError: true } });
        else{
            req.user.notes.push(note);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
                else{
                    res.status(200).json({ message: { msgBody: "successfully created note", msgError: false } });
                }
            })
        }
    })

});

userRouter.get("/notes", passport.authenticate("jwt", { session: false }), (req, res) => {

User.findById({_id: req.user._id}).populate("notes").exec((err, document)=>{
    if(err)
        res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
    else {
        res.status(200).json({notes: document.notes, authenticated:true});

    }
});
});

userRouter.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

    Note.findByIdAndDelete(req.params.id, (err, data)=>{
        if (err)
            res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
        else {
            res.status(200).json({ messagse: data});}})
    
});


userRouter.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    const {username, fullName} = req.user;
    res.status(200).json({isAuthenticated:true, user:{username, fullName}});

});



module.exports = userRouter;

