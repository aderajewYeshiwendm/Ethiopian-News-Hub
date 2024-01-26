const mongoose = require('mongoose');
const hostSchema = new mongoose.Schema({
    hostName: {
        required:true,
        type:String,
    },
    password: {
        required:true,
        type:String,
    }
   
});
const HostModel = mongoose.model('Host', hostSchema);
module.exports = HostModel;