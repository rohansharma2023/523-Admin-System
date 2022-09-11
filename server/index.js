const express = require('express')
const mongoose = require("mongoose")
const app = express()

const foodModel = require("./models/Food");

app.use(express.json())

mongoose.connect("mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,

});

app.get('/', async(req, res) => {
    const food = new foodModel({foodName: "Apple", daysSinceIAte: 3});

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