const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 

const foodModel = require("./models/Food");
const proposalModel = require("./models/Proposal");

app.use(express.json());
app.use(cors());

const dbname = "proposal"

mongoose.connect("mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/" + dbname + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post("/insert", async(req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days
    const food = new foodModel({foodName: foodName, daysSinceIAte: days});

    try {
        await food.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }
});

app.get("/read", async(req, res) => {
    proposalModel.find({}, (err, result)=>{
        if (err) {
            res.send(err);
        }
        
        res.send(result);
    }) 
});

app.get("/fetchById/:id", async(req, res) => {
    const id = req.params.id;
    
    proposalModel.find({_id: mongoose.Types.ObjectId(id)}, (err, result)=>{
        if (err) {
            res.send(err);
        }
        
        res.send(result);
    })
});

app.put("/update", async(req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    try {
        await foodModel.findById(id, (err, updatedFood)=>{
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    await foodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});





app.listen(3001, ()=>{
    console.log("server running on port 3001...");
});