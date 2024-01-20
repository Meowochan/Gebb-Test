import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const Submit = () => {
        let count = 0;

        const intervalId = setInterval(() => {
            console.log(count);
            count++;

            if (count > 2) {
                clearInterval(intervalId);
                window.location.href = "/login";
            }
        }, 1000);
    };
  return (
    <div className='flex flex-col mx-auto w-[50%]'>
        <p className='text-3xl font-bold mx-auto'>Register<br/></p>
        <input type='text' placeholder="User name" className='w-[50%] p-2 my-2 mt-6 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300' />
        <input type='password' placeholder="Password" className='w-[50%] p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300' />
        <input type='password' placeholder="Confirm Password" className='w-[50%] p-2 my-2 rounded-lg outline-slate-300 mx-auto border-solid border-[1px] border-gray-300' />
        <input onClick={Submit} type='submit' placeholder='Signup' className='btn w-[20%] min-h-[40px] h-[40px] mx-auto' />
        <div className='flex flex-row mx-auto'>
            <p className='text-base '>Already have an account? SignIn&nbsp;</p>
            <Link className='text-gray-400 hover:cursor-pointer' to="/login">Here.</Link>
        </div>
    </div>
  )
}

export default Register