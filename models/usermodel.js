const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name:{type: String},
    age:{type: Number},
    address:{type: String},
    gender:{type: String},
    email:{type: String},
    username:{type: String},
    password:{type: String},
    googleId:{type:String},
    role: { type: String,},

});
const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel;
