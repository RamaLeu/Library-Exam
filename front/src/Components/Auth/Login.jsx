import React, {useState} from 'react';
import {
    Link,
    useNavigate
  } from "react-router-dom";

const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    function loginUser(e){
        e.preventDefault();
        let data = {
                email: email,
                password: password,
            };
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
        fetch('http://localhost:3001/api/v1/auth/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    props.setUser(data.user);
                    navigate("../");
                    
                });
        }
  return (
    <div className='registerPage'>
        <h1>Prisijungti</h1>
        <form onSubmit={(e)=>{loginUser(e)}}>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} required placeholder='Vartotojo El. paštas'></input>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  required placeholder='Slaptažodis'></input>
            <input type="submit" className='authBtn' value="Prisijungti"></input>
        </form>
        <Link to="/" className='linkBtn brownBtn'>Atgal</Link>
    </div>
  )
}

export default Login