// MODEL REQUIREMENTS //

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

// SCHEMA DEFINITION // 

const Schema = mongoose.Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose)

// MODULE EXPORT // 

module.exports = mongoose.model('User', UserSchema)

