let _   = require("lodash");
const Cat = require("../Model/Cat");
let cat = require("../Model/Cat");

module.exports = function(app){


    // this is the callback way of doing
    // app.post("/cats",(req,res)=>{
    //     var newCat = new Cat(req.body);
    //     newCat.save((err,result)=>{
    //         if(err){
    //             res.json({"err":"problem creating cat"});
    //         }
    //         res.json(result);
    //     })
    // })

    app.post("/cats", async (req,res)=>{
        var newCat = await Cat.create(req.body);
        if(!newCat){
            res.json({"err":"problem creating cat"});
        }
        res.json(newCat);
    })


    app.get("/cats", async (req,res)=>{
        // this is the new way of doing
        var cats = await Cat.find({});
        if(!cats){
            res.json({"err":"problem getting cat"})
        }
        res.json(cats);
        
    })

    app.get("/cats/:id", async (req,res)=>{
        var cat = await Cat.findById(req.params.id);
        if(!cat){
            res.json({"err":"problem getting cat"})
        }else{
            res.json(cat);
        }
        
    })

    app.put("/cats/:id",(req,res)=>{
        var newCat = req.body;
        Cat.findById(req.params.id,(err,cat)=>{
            if(err){
                res.json({"err":"error finding a cat"});
            }
            _.merge(cat,newCat);
            cat.save((err,result)=>{
                if(err){
                    res.json({"err":"error saving a cat"});
                }
                res.json(result);
            })
            
        })
    })


    app.delete("/cats/:id",(req,res)=>{
        Cat.findByIdAndRemove(req.params.id,(err,cat)=>{
            if(!cat){
                res.json({"err":"error finding a cat"});
            }else{
                res.json({"msg":"cat is removed"});
            }
            
        })
    })

    return app;
}