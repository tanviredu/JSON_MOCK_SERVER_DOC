let mongoose = require("mongoose");
let Schema   = mongoose.Schema;

var catSchema = mongoose.Schema({
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

module.exports = mongoose.model("Cat",catSchema);