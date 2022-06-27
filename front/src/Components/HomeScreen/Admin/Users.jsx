import React, {useState, useEffect} from 'react';
import './Users.css';
var bcrypt = require('bcryptjs');

const Users = () => {
    let [users, setUsers] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [isEditing, setIsEditing] = useState(false);
    let [editingID, setEditingID] = useState("");
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [type, setType] = useState("");
    let [repPassword, setRepPassword] = useState('');


    function fetchUsers(){
        fetch('http://localhost:3001/api/v1/auth')
        .then(response => response.json())
        .then(data => {
            setUsers(data.users);
            console.log(data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    

    function addUser(e){
        if(!isEditing){
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword;
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
                type: type
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:3001/api/v1/auth/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                    setEditingID("");
                    setIsEditing(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setRepPassword("");
                    setType("");
                });
        }}else{
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword;
        let isValid = true;
        e.preventDefault();
        if (password !== repPassword){
            isValid = false;
        }
        if (isValid){
            hashedPassword = bcrypt.hashSync(password, salt);
            console.log(username);
            let changeData;
            if (password){
                changeData = {
                    id: editingID,
                    username: username,
                    password: hashedPassword,
                    email: email,
                    salt: salt,
                    type: type
                };
            }else{
                changeData = {
                id: editingID,
                username: username,
                email: email,
                salt: salt,
                type: type
            };}
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(changeData)
            };
            fetch('http://localhost:3001/api/v1/auth/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                    setEditingID("");
                    setIsEditing(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setRepPassword("");
                    setType("");
                });
        }
    }}

    function deleteUser(id){
        fetch('http://localhost:3001/api/v1/auth/'+ id, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
            console.log(data);
            fetchUsers();
        });
    }

    function editUser(user){
        console.log(username);
        console.log(isEditing);
        setUsername(user.username);
        setEmail(user.email);
        setType(user.type);
        setEditingID(user._id);
        setIsEditing(true);
    }

  return (
    <div className='adminUsers'>
        <div className='adminUsersAdd'>
            <form onSubmit={(e)=>{addUser(e)}}>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder="Vardas"></input>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="El. Paštas"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Slaptažodis"></input>
                <input type="password" onChange={(e)=>{setRepPassword(e.target.value)}}  placeholder="Pakartoti slaptažodi"></input>
                <select onChange={(e)=>{setType(e.target.value)}} value={type}>
                    <option value="" disabled hidden>Tipas</option>
                    <option value="user">Vartotojas</option>
                    <option value="admin">Administratorius</option>
                </select>
                <input type="submit" className="brownBtn userAddBtn" value="Pridėti"></input>
            </form>
        </div>
        {!isLoading &&
        <div className='adminUsersList'>
            {users.map((user)=>(
                <div className="adminUserSingle">
                    <span>{user.email}</span>
                    <span>{user.username}</span>
                    <span>{user.type}</span>
                    <button onClick={()=>{editUser(user)}}>Keisti</button>
                    <button onClick={()=>{deleteUser(user._id)}}>Šalinti</button>
                </div>
            ))}</div>}
    </div>
  )
}

export default Users