import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorNote, setErrorNote] = useState('');

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
          setErrorNote('')
          console.log(response.data); // Log the server response
          if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userType', response.data.userType);
            console.log('Token saved to localStorage');
          }
          window.location.href = "/";
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              setErrorNote('Invalid username or password')
            } else if (error.response.status === 500) {
              alert('Internal Server Error. Please try again later.');
            } else {
              console.error(`Server returned status code: ${error.response.status}`);
            };
          };
        }
    };
    
  return (
    <div className='flex flex-col mx-auto w-[25%]'>
        <p className='text-3xl font-bold mx-auto'>Login<br/></p>
        <p className='text-2xl mx-auto'>Welcome back!</p>
        <input type='text' placeholder="Username" value={username} onChange={handleUsernameChange} className='w-full p-2 my-2 mt-6 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300 focus:ring-0 focus:border-gray-300' />
        <input type='password' placeholder="Password" value={password} onChange={handlePasswordChange} className='w-full p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300 focus:ring-0 focus:border-gray-300' />
        {errorNote && (
          <p className='text-red-500'>
            {errorNote}
          </p>
        )}
        <input onClick={handleSubmit} type='submit' placeholder='Login' className='btn w-[20%] min-h-[40px] h-[40px] mx-auto' />
        <div className='flex flex-row mx-auto mt-3'>
            <p className='text-base '>Don't have an account? SignUp&nbsp;</p>
            <Link className='text-gray-400 hover:cursor-pointer' to="/register">Here.</Link>
        </div>
    </div>
  )
}

export default Login