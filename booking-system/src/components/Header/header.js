import React from 'react'
import Login from './enter.png'
import Logo from './movies.png'
import { Link } from 'react-router-dom'

const header = ({ isLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
      };

  return (
    <div>
        <div className='max-w-screen flex flex-wrap items-center justify-between px-12 py-6'>
            <div className='flex justify-center align-middle text-center'>
                <img src={Logo} className='h-14 inline-block mr-5' alt='Logo'/>
                <Link className='text-2xl m-auto' to='/'>GEBB Booking System</Link>
            </div>
            <div className='flex flex-wrap items-center'>
                <Link to="/status" className='text-xl mr-10'>Status</Link>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className='btn flex'>
                            <p>Logout</p>
                            <img src={Login} className='h-6 mr-2' alt="Login Icon"/>
                        </button>
                        
                    ):(
                        <Link to="/login" className='btn flex'>
                            <p>Login</p>
                            <img src={Login} className='h-6 mr-2' alt="Login Icon"/>
                        </Link>
                    )}
            </div>
        </div>
        <div className="mx-7 h-px bg-gray-200 mb-5"></div> {/* Partition Line */}
    </div>
  )
}

export default header