import React from 'react'
/*import DeleteText from '../containers/DeleteText.js'
import EditText from '../containers/EditText.js'*/

const Text = ({ id, text }) => (

  <div>

  <li >
    {id}
  </li>
  <li >
    {text}
  </li>

  </div>
)

export default Text
/*  <DeleteText id={id}/>
  <EditText id ={id} text={text}/>*/