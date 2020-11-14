let mongoose = require("mongoose");
let Schema   = mongoose.Schema;

let dogSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Dog",dogSchema);
