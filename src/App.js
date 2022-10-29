import React, {useState, useRef, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes , Route, Navigate , useNavigate } from "react-router-dom";
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/NavBar/NavBar';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes >
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/users/:userId" element={<User/>}></Route>
          <Route exact path="/auth" element={<Auth/>}></Route>
      </Routes >
      </BrowserRouter>

      
    </div>
  );
}

export default App;
