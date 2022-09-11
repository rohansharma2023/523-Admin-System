const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const foodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/?retryWrites=true&w=majority", {
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

app.listen(3001, ()=>{
    console.log("server running on port 3001...");
});