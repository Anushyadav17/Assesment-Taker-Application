import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = formData;

  function changeHandler(event) {
    setFormData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("login submitted successfully");
    // Simulate successful login
    setIsLoggedIn(true);
    dispatch(login(email, password, navigate, setIsLoggedIn));

  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm md:max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Welcome To Quizz-app</h1>
          <p className="mt-2 text-gray-600">Login</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">
              <span className="block mb-1">
                Email Address <sup className="text-red-500">*</sup>
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={changeHandler}
                placeholder="Enter Email Address"
                name="email"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isLoggedIn}
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">
              <span className="block mb-1">
                Password <sup className="text-red-500">*</sup>
              </span>
              <input
                required
                type="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isLoggedIn}
              />
            </label>
          </div>

          <button 
            type="submit"
            className={`w-full py-2 rounded-lg transition-colors duration-300 ${isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            disabled={isLoggedIn}
          >
            {isLoggedIn ? 'Login...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
