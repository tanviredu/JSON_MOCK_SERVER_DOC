var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var config     = require("./config/config")
var mongourl   = config.mongourl; 
var connect    = mongoose.connect(mongourl);
const PORT     = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var dog = require("./Route/dog")(app)

app.listen(PORT,()=>{
    console.log(`SERVER STARTED AT ${PORT}`);
})