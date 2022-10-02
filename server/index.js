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

// redo for client interface

// app.post("/insert", async(req, res) => {
//     const foodName = req.body.foodName;
//     const days = req.body.days
//     const food = new foodModel({foodName: foodName, daysSinceIAte: days});

//     try {
//         await food.save();
//         res.send("inserted data");
//     } catch(err) {
//         console.log(err);
//     }
// });

// grab all data from database
app.get("/read", async(req, res) => {
    try {
        proposalModel.find({}, (err, result)=>{
            if (err) {
                res.send(err);
            }
            
            res.send(result);
        }) 
    } catch(err) {
        console.log(err);
    }
});

// grab one proposal data by id
app.get("/fetchById/:id", async(req, res) => {
    try {
        const id = req.params.id;
        proposalModel.find({_id: mongoose.Types.ObjectId(id)}, (err, result)=>{
            if (err) {
                res.send(err);
            }
            
            res.send(result);
        })
    } catch(err) {
        res.send("Proposal Does not Exist.");
    }
});

// update status of proposal
app.put("/update", async(req, res) => {
    try {
        const newStatus = req.body.newStatus;
        const id = req.body.id;
        await proposalModel.findById(id, (err, updatedStatus)=>{
            updatedStatus.status = newStatus;
            updatedStatus.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

// app.delete("/delete/:id", async(req, res)=>{
//     try {
//         const id = req.params.id;
//         await foodModel.findByIdAndRemove(id).exec();
//         res.send("deleted");
//     } catch(err) {
//         console.log(err);
//     }
// });





app.listen(3001, ()=>{
    console.log("server running on port 3001...");
});