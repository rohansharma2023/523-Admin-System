import React, { useState, useEffect } from "react";
import M from 'materialize-css';
import {Link} from 'react-router-dom'
function Error(props) {

    return (
        <>
        <div className="errorBody" style={{position:'relative',top:'100px'}}>
        <i className="medium material-icons">error</i>
        <h6 style={{fontWeight:'bold', fontSize:'20px'}}>{props.message}</h6>
        </div>
        </>
    );
}

export default Error;