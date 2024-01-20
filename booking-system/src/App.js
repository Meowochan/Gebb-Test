import Header from './components/Header/header'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Status from './components/Pages/status';
import Movies from './components/Pages/movies';
import Login from './components/Pages/login';
import Register from './components/Pages/register';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        // Check for authentication token in local storage or cookie
        const token = localStorage.getItem('token');
        const adminStatus = localStorage.getItem('userType')
        if (token) {
          // Token found, user is logged in
          setLoggedIn(true);
        }
        if (adminStatus == "admin") {
          setAdmin(true);
          console.log(isAdmin)
        }
      }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
      <Routes>
        <Route path='status' element={<Status/>}/>
        <Route path='' element={<Movies />}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
