import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen from-red-500 to-pink-500">
            <div className="text-center p-10 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
                <p className="text-lg text-gray-700 mb-6">Something went wrong. Please try again later.</p>
                <Link to="/">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
                    >
                        Go to Home
                    </button>
                </Link>
                <button
                   onClick={() => {
                    dispatch(logout(navigate));
                  }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 m-2"
                >
                        Logout
                </button>    
            </div>
        </div>
    );
}

export default ErrorPage;
