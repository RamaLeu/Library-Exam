import React from 'react'
import { Link } from 'react-router-dom';
import './MainScreen.css';

const MainScreen = () => {
  return (
    <div className='mainPage'>
        <h1>LIB-lioteka</h1>
        <Link className='brownBtn' to={"/login"}>Prisijungti</Link>
        <Link className='brownBtn' to={"/register"}>Registruotis</Link>
    </div>
  )
}

export default MainScreen