require('dotenv').config()
const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const NotesSchema = mongoose.Schema({
title:{
    type:String,
},
content:{
    type:String,
    required:true
}

});

const key = process.env.NOTE_ENCRYPTION_KEY;

NotesSchema.plugin(mongooseFieldEncryption, {
    fields: ["title", "content"],
    secret: key
});

module.exports = mongoose.model('Note', NotesSchema)