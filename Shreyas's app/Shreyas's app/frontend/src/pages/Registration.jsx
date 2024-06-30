import React, { useState } from 'react';
import { TextField, Button, Backdrop } from '@mui/material';
import axios from 'axios';
import {Link} from "react-router-dom"
import "./Registration.css"

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [dob, setDob] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [open, setOpen] = useState(false);

    const textChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'repassword') setReEnteredPassword(value);
        if (name === 'dob') setDob(value);
    };

    const checkPassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password === reEnteredPassword) {
            if (password.match(passwordRegex)) {
                setIsPasswordMatch(false);
                setPasswordErrorText("");
            } else {
                setIsPasswordMatch(true);
                setPasswordErrorText("should have :size > 8, 1-Uppercase, 1-Number");
            }
        } else {
            setIsPasswordMatch(true);
            setPasswordErrorText("Password Not Match!");
        }
    };

    const checkUserObject = () => {
        return !(name && email && password && reEnteredPassword && dob && !isPasswordMatch);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const RegisterUser = () => {
        if (!checkUserObject()) {
            axios.post('http://localhost:8000/register', {
                name: name,
                email: email,
                password: password,
                confirm_password:reEnteredPassword,
                dob: dob,
            })
                .then(response => {
                    console.log(response.data);
                    if (response.data.status && response.data.data) {
                      setName("");
                      setEmail("");
                      setPassword("");
                      setReEnteredPassword("")
                      setDob("");
                        handleOpen()
                      
                        
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-wrapper">
                <h1>Registration</h1>
                <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    className='login-input'
                    label="Name"
                    value={name}
                    type='text'
                    autoFocus
                    placeholder='Name'
                    variant="standard"
                    name='name'
                    onChange={textChangeHandler}
                />
                <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    className='login-input'
                    label="Email"
                    value={email}
                    type='email'
                    placeholder='Email'
                    variant="standard"
                    name='email'
                    onChange={textChangeHandler}
                />
                <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    className='login-input'
                    label="Password"
                    value={password}
                    type='password'
                    placeholder='Password'
                    variant="standard"
                    name='password'
                    error={isPasswordMatch}
                    helperText={passwordErrorText}
                    onChange={textChangeHandler}
                />
                <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    className='login-input'
                    label="Re-Enter Password"
                    value={reEnteredPassword}
                    type='Password'
                    placeholder='Re-Enter Password'
                    variant="standard"
                    name='repassword'
                    onBlur={checkPassword}
                    onChange={textChangeHandler}
                />
                <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    className='login-input'
                    label="Date of Birth"
                    value={dob}
                    type='date'
                    placeholder='Date of Birth'
                    variant="standard"
                    name='dob'
                    onChange={textChangeHandler}
                />
                <Button
                    variant="contained"
                    className='login-input'
                    disabled={checkUserObject()}
                    onClick={RegisterUser}
                    id='Login-btn'
                >
                    Register
                </Button>

                  <span>Already have an Account? <Link to ="/login"><span style={{color:"#253ce8", cursor:"pointer"}}>Sign in.</span></Link></span>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <div className="backdrop-card">
                        <h3>Registration Successful!</h3> <br />
                        <span>Go to <span style={{color:"blue", cursor:"pointer"}}>&nbsp;<Link to ="/login">Sign in.</Link></span></span>
                    </div>
                </Backdrop>
            </div>
        </div>
    );
};

export default Registration;
