import React from 'react'
import M from 'materialize-css'

export default function FileCard(props) {
  return (
<div id="fileContent" className='waves-effect' >
    <div className='button'>
          <i class="material-icons" >attach_file</i>
          </div>
<p style={{marginLeft:'10px', textAlign:'left',overflow: 'hidden', textOverflow:'ellipsis',
whiteSpace: 'nowrap'}}>{props.fileName} </p>

<div id='deleteBut' className='button2 waves-effect' onClick={props.deleteFunction}>

<i class="material-icons" style={{fontSize:'22px', color:'#ef5350', position:'relative', top:'8px',right:'0.5px'}}>delete</i>
</div>


    </div> 
    )
}
