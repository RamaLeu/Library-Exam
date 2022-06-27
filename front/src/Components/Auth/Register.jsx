import React, { useState } from 'react';
import './Register.css';
import {
    Link,
    useNavigate
  } from "react-router-dom";
var bcrypt = require('bcryptjs');

const Register = (props) => {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [repPassword, setRepPassword] = useState('');
    let navigate = useNavigate();

    function registerUser(e){
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword
        let isValid = true;
        e.preventDefault();
        if (password !== repPassword){
            isValid = false;
        }
        if (isValid){
            hashedPassword = bcrypt.hashSync(password, salt);
            console.log(hashedPassword);
            let data = {
                username: username,
                email: email,
                password: hashedPassword,
                salt: salt,
                type: "user"
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:3001/api/v1/auth/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                    props.setUser(
                        data.data.user
                    );
                    navigate("../");
                });
        }
    }
  return (
    <div className='registerPage'>
        <h1>Registruotis</h1>
        <form onSubmit={(e)=>{registerUser(e)}}>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required placeholder='Vartotojo vardas'></input>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} required placeholder='Vartotojo El. Paštas'></input>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  required placeholder='Slaptažodis'></input>
            <input type="password" onChange={(e)=>{setRepPassword(e.target.value)}}  required placeholder='Pakartoti slaptažodį'></input>
            <input type="submit" className='authBtn' value="Registruotis"></input>
        </form>
        <Link to="/" className='linkBtn brownBtn'>Atgal</Link>
    </div>
  )
}

export default Register