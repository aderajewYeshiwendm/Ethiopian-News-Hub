const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{type: String, required:false,},
    age:{type: Number, required:false,},
    address:{type: String, required:false,},
    gender:{type: String, required:false,},
    email:{type: String, required:true,},
    username:{type: String, required:true,},
    password:{type: String, required:true,}
});
const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel;