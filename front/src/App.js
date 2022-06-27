import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import MainScreen from './Components/MainScreen/MainScreen';
import HomeScreen from './Components/HomeScreen/HomeScreen';

function App() {
  let [currentUser, setCurrentUser] = useState('');

  return (
    <div className="App">
      <Router>
        <Routes>
          {!currentUser ? <>
          <Route path= "/" element={<MainScreen/>}></Route>
          <Route path= "/register" element={<Register setUser={setCurrentUser}/>}></Route>
          <Route path= "/login" element={<Login setUser={setCurrentUser}/>}></Route>
          </>:
          <>
                      <Route path= "/" element={<HomeScreen user={currentUser} setUser={setCurrentUser}/>}></Route>
            </>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
