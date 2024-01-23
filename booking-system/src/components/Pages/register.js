import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorNoteUsername, setErrorNoteUsername] = useState('');
    const [errorNotePassword, setErrorNotePassword] = useState('');
    const [errorNoteConfirmPassword, setErrorNoteConfirmPassword] = useState('');
    const handleUsernameChange = (e) => {
      const newUsername = e.target.value;
      if (newUsername.length >= 5) {
        setUsername(newUsername);
        setErrorNoteUsername('')
      } else{
        setErrorNoteUsername('Username must be at least 5 characters long!')
      }

    };
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      if (newPassword.length > 8) {
        setPassword(newPassword);
        setErrorNotePassword('')
      } else {
        setErrorNotePassword('Password must be at least 8 characters long!')
      }

    };
    const handleConfirmPasswordChange = (e) => {
      const newConfirmPassword = e.target.value;
      if (newConfirmPassword === password) {
        setErrorNoteConfirmPassword('')
      } else {
        setErrorNoteConfirmPassword(`Password doesn't match. Try again.`)
      }
    };
    const Submit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/register', {
              username,
              password,
            });
            console.log(response.data); // Log the server response
            window.location.href = "/login";
          } catch (error) {
              if (error.response) {
                if (error.response.status === 400) {
                  setErrorNoteUsername('Username already taken. Slowpoke!')
                } else if (error.response.status === 500) {
                  alert('Internal Server Error. Please try again later.');
                } else {
                  console.error(`Server returned status code: ${error.response.status}`);
            };
          };
        };
    };
  return (
    <div className='flex flex-col mx-auto w-[25%]'>
        <p className='text-3xl font-bold mx-auto mb-4'>Register<br/></p>
        <input type='text' onChange={handleUsernameChange} placeholder="User name" className={`w-full p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300 focus:ring-0 focus:border-gray-300 ${errorNoteUsername ? 'border-red-500' : ''}`} />
        {errorNoteUsername && (
          <p className='text-red-500'>
            {errorNoteUsername}
          </p>
        )}
        <input type='password' onChange={handlePasswordChange} placeholder="Password" className={`w-full p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300 focus:ring-0 focus:border-gray-300 ${errorNotePassword ? 'border-red-500' : ''}`} />
        {errorNotePassword && (
          <p className='text-red-500'>
            {errorNotePassword}
          </p>
        )}
        <input type='password' onChange={handleConfirmPasswordChange} placeholder="Confirm Password" className={`w-full p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300 focus:ring-0 focus:border-gray-300 ${errorNoteConfirmPassword ? 'border-red-500' : ''}`} />
        {errorNoteConfirmPassword && (
          <p className='text-red-500'>
            {errorNoteConfirmPassword}
          </p>
        )}
        <input onClick={() => (!errorNoteUsername && !errorNotePassword && !errorNoteConfirmPassword ? Submit() : console.log('Boooo'))} type='submit' placeholder='Signup' className='btn w-[20%] min-h-[40px] h-[40px] mx-auto' />
        <div className='flex flex-row mx-auto mt-3'>
            <p className='text-base '>Already have an account? SignIn&nbsp;</p>
            <Link className='text-gray-400 hover:cursor-pointer' to="/login">Here.</Link>
        </div>
    </div>
  )
}

export default Register