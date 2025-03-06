import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Simulated login with localStorage
  const loginUser = (loginData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")); 
    if (!storedUsers || storedUsers.length === 0) {
      return null; // No users found
    }

    // Check if credentials match any stored user
    const user = storedUsers.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );

    if (user) {
      return { token: "mock-auth-token" }; // Simulated token
    }
    return null; // Invalid credentials
  };

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", login.email)
    localStorage.setItem("passwword",login.password)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(login);

    if (success) {
      const token = success.token;
      handleLogin(token);
      navigate("/"); // Redirect to homepage or dashboard
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 mt-10 border border-gray-300">
        {errorMessage && (
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={login.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={login.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
