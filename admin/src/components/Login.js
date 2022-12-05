import React, { useState, useEffect } from "react";
import '../styles/Login.css'
import M from 'materialize-css';
import {useNavigate} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import qs from 'qs'
const axios = require('axios').default;

function Login(props) {
    const [error, setError] = useState('no')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const login = async () =>{
        let data = {username: username, 
        password:password}

        await axios({
            method: "post",
            url: "https://elated-deer-cap.cyclic.app/login",
            data: qs.stringify(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },

          }).then((res) =>{
            console.log(res.data == true)
            if (res.data != ''){
                localStorage.setItem('user', res)
                console.log(res.data)
                setError('no')
                props.change()
                navigate('/')
            }
            else{
                console.log(res.data)

                setError('yes')
            }
        }).catch((err)=>{
            console.log(err)
            alert("Something went wrong when logging in. Please try again.")
        })
    }
    useEffect(() => {
        if(props.loggedIn) {
          navigate('/')
        }
      }, [props.loggedIn])  
    return (
        <>
        <div className="container" style = {{position:'relative', top:'85px'}}>
            <MdAccountCircle style = {{fontSize:'50px',position:'relative', top:'-10px'}}/>
       <h5 className="loginPage" style = {{fontWeight :'bold',position:'relative',position:'relative', top:'-10px', }}>Login</h5>
       <p style={{opacity:`${error == 'no'? '0%' : '100%'}`, fontWeight:'500', position:'relative', top:'-4px',color:'red', transition:'0.2s ease-in-out'}}>Incorrect username or password.</p>
       <div style={{marginTop:'-25px'}}>
       <div className="input-field" onChange={(event) =>{setUsername(event.target.value)}}>
        <p style = {{fontWeight:'bold', textAlign :'left', position:'relative', top:'10px'}}>Username</p>
       <input id="user name" type="text" ></input>

       </div>
       
       <div className="input-field" onChange={(event) =>{setPassword(event.target.value)}}>
       <p style = {{fontWeight:'bold', textAlign :'left', position:'relative', top:'10px'}}>Password</p>

       <input id="password" type="password"  ></input>

       </div>
       <div   className={`options waves-effect`} onClick = { () =>{login()}} style = {{ position:'relative', top:'40px'}}>
       <FiLogIn style={{fontSize:'20px', position:'relative', top:'19px',left:'-1.5px'}}/>
       </div>
        </div>
        </div>
        </>
    );
}

export default Login;