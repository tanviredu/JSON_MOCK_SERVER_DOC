let _   = require("lodash");
const Dog = require("../Model/Dog");



// why we put the result like (err,result) as a parameter of a 
// function?
// it send the two result err,and result
// we then apply it another function and this two are the parameters
// so we execute this function inside the parent function
// so when all the work done we get the result

module.exports = function(app){

    app.post("/dogs",(req,res)=>{
        var newDog = new Dog(req.body);
        newDog.save((err,dog)=>{
            if(err){
                res.json({"err":"error saving dog"});
            }
            res.json(dog);
        })
    })


    app.get("/dogs",(req,res)=>{
        Dog.find({},(err,dogs)=>{
            if(!dogs){
                res.json({"err":"error getting dogs"});
            }else{
                res.json(dogs);
            }
            
        })    
    })

    app.get("/dogs/:id",(req,res)=>{
        Dog.findById(req.params.id,(err,dog)=>{
            if(!dog){
                res.json({"err":"error finding dog"});
            }else{
                res.json(dog);
            }
            
        })
    })


    app.put("/dogs/:id",(req,res)=>{
        Dog.findById(req.params.id,(err,dog)=>{
            if(!dog){
                res.json({"err":"error finding dog"});
            }else{
                _.merge(dog,req.body);
                dog.save((err,result)=>{
                    if(err){
                        res.json({"err":"error updating dog"});
                    }
                    res.json(result);
                })
            }

        })
    })


    app.delete("/dogs/:id",(req,res)=>{
        Dog.findByIdAndRemove(req.params.id,(err)=>{
            if(err){
                res.json({"err":"error deleting data"});
            }
            res.json({"msg":"data is deleted"});
        })
            
    })

    return app;

}