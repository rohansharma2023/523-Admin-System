import React, { useState, useEffect } from "react";
import './App.css';

const axios = require('axios').default;

function App() {
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [file, setFile] = useState("");

    const addToList = () => {
        axios.post("http://localhost:3001/insert", {
            title: title, 
            description: description,
            email: email,
            date: date, 
            status: status, 
            institution: institution,
            name: name, 
            phone_number: phone_number, 
            file: file, 
        });
    };

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
        <div className="App">
            <h1>Client Proposal</h1>
            <label>Title</label>
            <input type="text" onChange={(event)=>{
                setTitleName(event.target.value);
            }}></input>
            <label>Please give a description of your project</label>
            <input type="text" onChange={(event)=>{
                setDescription(event.target.value);
            }}></input>
            <label>Date</label>
            <input type="text" onChange={(event)=>{
                setDate(event.target.value);
            }}></input>
            <label>Status</label>
            <input type="text" onChange={(event)=>{
                setStatus(event.target.value);
            }}></input>
            <label>Please enter the name of your organization or institution</label>
            <input type="text" onChange={(event)=>{
                setInstitution(event.target.value);
            }}></input>
            <label>Please enter your name</label>
            <input type="text" onChange={(event)=>{
                setName(event.target.value);
            }}></input>
            <label>Please enter a valid Phone Number that we can contact</label>
            <input type="text" onChange={(event)=>{
                setPhoneNumber(event.target.value);
            }}></input>
            <label>Feel Free to add any files you deem important</label>
            <form action= "/upload" method="POST" 
            enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input type="file" name="file" id="file" class="custom-file-input" onChange={(event)=>{
                        setFile(event.target.value);
                    }}></input>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div>
                {/*<input type="submit" value="submit" class="btn btn-primary btn-block"></input>*/}   
            </form>
            {/*<input type="text" onChange={(event)=>{
                setFile(event.target.value);
            }}></input>*/} 
            <button onClick={() =>{addToList()}}>Submit</button> 
        </div>
    );
}

export default App;
