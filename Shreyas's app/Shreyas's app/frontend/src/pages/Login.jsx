import { TextField, Button } from '@mui/material'
import React, { useState} from 'react'
import "./Login.css"
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'
import { red } from '@mui/material/colors'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");

  const history = useHistory();

  const textChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);

    checkUserObject();
    setErrorText("");
  }

  const checkUserObject = () => {
    if (email && password ) {
        setIsLoginButtonDisabled(false);
    } else {
        setIsLoginButtonDisabled(true);
    }
};

  function LoginUser(){

    console.log( email + password)
    if(email && password ){

      axios.post('http://localhost:8000/login',  {
        email:email,
        password:password,
      }) 
        .then(response => {
          console.log(response.data.data);

          if(response.data.status && response.data.token){
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", response.data.data);
            history.push("/home");
          }
          else{
            setErrorText("Invalid Email or Password!")

          }
        
        })
        .catch(error => {
          console.error( error);
          setErrorText("Invalid Email / password");
        });
    }
} 
  return (
    <div className="login-conatainer">
        <div className="login-wrapper">
            <h1>Login</h1>
            <TextField id="standard-basic" 
            sx={{ m: 3 }}className='login-input' 
            label="Email" type='email' autoFocus 
            placeholder='Email' variant="standard"
            name='email'
            onChange={textChangeHandler}
             />

            <TextField id="standard-basic" 
            className='login-input'label="Password"
             type='password' variant="standard" 
             placeholder='Password' 
             name='password'
             onChange={textChangeHandler}
             />

             <span style={{color:"red", marginTop:"4px" }}>{errorText}</span>

            <Button variant="contained" 
            className='login-input' 
            onClick={LoginUser}
            disabled={isLoginButtonDisabled}
            id='Login-btn'>Login</Button>

            <span style={{color:'GrayText'}}>
            Don't have an account? &nbsp;
            <Link to="/register">
            <span style={{textDecoration:"none", color:'#253ce8'}}>
            Create one.</span></Link></span>
        </div>
    </div>
  )
}

export default Login