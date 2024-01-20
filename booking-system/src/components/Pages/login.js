import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/login', {
            username,
            password,
          });
          console.log(response.data); // Log the server response
          if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            console.log('Token saved to localStorage');
          }
          window.location.href = "/";
        } catch (error) {
          console.error(error.response.data);
        }
    };
    
  return (
    <div className='flex flex-col mx-auto w-[50%]'>
        <p className='text-3xl font-bold mx-auto'>Login<br/></p>
        <p className='text-2xl mx-auto'>Welcome back!</p>
        <input type='text' placeholder="Username" value={username} onChange={handleUsernameChange} className='w-[50%] p-2 my-2 mt-6 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300' />
        <input type='password' placeholder="Password" value={password} onChange={handlePasswordChange} className='w-[50%] p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300' />
        <input onClick={handleSubmit} type='submit' placeholder='Login' className='btn w-[20%] min-h-[40px] h-[40px] mx-auto' />
        <div className='flex flex-row mx-auto'>
            <p className='text-base '>Don't have an account? SignUp&nbsp;</p>
            <Link className='text-gray-400 hover:cursor-pointer' to="/register">Here.</Link>
        </div>
    </div>
  )
}

export default Login