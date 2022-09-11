import React, { useState, useEffect } from "react";
import './App.css';
const axios = require('axios').default;
//import Axios from "axios";

function App() {
    const [foodName, setFoodName] = useState("");
    const [days, setDays] = useState(0);

    const addToList = () => {
        axios.post("http://localhost:3001/insert", {
            foodName: foodName, 
            days: days,
        });
    };

    return (
        <div className="App">
            <h1>crud app with mern</h1>

            <label>Food Name</label>
            <input type="text" onChange={(event)=>{
                setFoodName(event.target.value);
            }}></input>
            <label>Days since you ate it</label>
            <input type="number" onChange={(event)=>{
                setDays(event.target.value);
            }}></input>
            <button onClick={addToList}>Add to list</button>
        </div>
    );
}

export default App;
