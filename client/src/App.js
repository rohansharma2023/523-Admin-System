import React, { useState, useEffect } from "react";
import './App.css';
const axios = require('axios').default;
//import Axios from "axios";

function App() {
    const [foodName, setFoodName] = useState("");
    const [days, setDays] = useState(0);
    const [foodList, setFoodList] = useState([]);
    const [newFoodName, setNewFoodName] = useState("");

    const addToList = () => {
        axios.post("http://localhost:3001/insert", {
            foodName: foodName, 
            days: days,
        });
    };

    const updateFood = (id) => {
        axios.put("http://localhost:3001/update", {
            id: id,
            newFoodName: newFoodName,
        });
    }

    const deleteFood = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`);
    }

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            console.log(res);
            setFoodList(res.data);
        });
    }, []);

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
        
            <h1>Food List</h1>
            {foodList.map((val, key)=>{
                return (
                    <div key="key" className="food">
                        <h1>{val.foodName}</h1>
                        <h1>{val.daysSinceIAte}</h1>
                        <input 
                            type="text" 
                            placeholder="New Food Name ..." 
                            onChange={(event)=>{
                                setNewFoodName(event.target.value);
                            }}>
                        </input>
                        <button onClick={()=>{updateFood(val._id)}}>Update</button>
                        <button onClick={()=>{deleteFood(val._id)}}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
