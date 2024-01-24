import React from 'react'
import Login from './enter.png'
import { Link } from 'react-router-dom'
import './header.css'

const header = ({ isLoggedIn, isAdmin }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        window.location.href = "/login";
    };

    return (
        <div>
            <div className='max-w-screen flex flex-wrap items-center justify-between px-12 py-6'>
                <div className='flex justify-center align-middle text-center'>
                    <Link className='text-2xl m-auto' to='/'>Booking System</Link>
                </div>
                <div className='flex flex-wrap items-center'>
                    <Link to="/" className='text-xl mr-10 underlineWhenHover'>Home</Link>
                    {isAdmin && (<Link to="/control-panel" className='text-xl mr-10 underlineWhenHover'>Panel</Link>)}
                    <Link to="/status" className='text-xl mr-10 underlineWhenHover'>Reservation Status</Link>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className='btn flex'>
                            <p>Logout</p>
                            <img src={Login} className='h-6 mr-2' alt="Login Icon" />
                        </button>

                    ) : (
                        <Link to="/login" className='btn flex'>
                            <p>Login</p>
                            <img src={Login} className='h-6 mr-2' alt="Login Icon" />
                        </Link>
                    )}
                </div>
            </div>
            <div className="mx-7 h-px bg-gray-200 mb-5"></div> {/* Partition Line */}
        </div>
    )
}

export default header