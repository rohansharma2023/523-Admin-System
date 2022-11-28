import React, { useState, useEffect } from "react";
// import { createBrowserHistory } from 'history';
// import {Router, Route, Link} from "react-router-dom";
// import './SubmissionCmpl.js';
import MainPage from "./components/MainPage";
import M from "materialize-css";
const axios = require('axios').default;

function App() {
    

    /* const updateFood = (id) => {
        axios.put("http://localhost:3001/update", {
            id: id,
            newFoodName: newFoodName,
        });
    } */

    /* const deleteFood = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`);
    } */

   /*  useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            console.log(res);
            setFoodList(res.data);
        });
    }, []);*/

    return (
        <div className="container">
        <MainPage/>

        </div>

    );
}

export default App;
