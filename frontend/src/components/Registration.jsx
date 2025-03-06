import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    // Check if the user already exists in localStorage
    const existingUser = localStorage.getItem("users");
    const users = existingUser ? JSON.parse(existingUser) : [];

    // Check if the email already exists
    const userExists = users.some((user) => user.email === registration.email);

    if (userExists) {
      setErrorMessage("Email already registered. Please login.");
      setSuccessMessage("");
      return;
    }

    // Save the registration data to localStorage
    users.push(registration);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMessage("Registration successful!");
    setErrorMessage("");

    // Reset the form fields
    setRegistration({
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    });

    toast.success("Registration successful!", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-5 md:px-8 py-7 mx-4 mt-5 border border-gray-300">
        {errorMessage && (
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {successMessage}
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegistration}>
          {["name", "email", "password", "address", "phone"].map((field) => (
            <div className="mb-5" key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field === "password" ? "password" : "text"}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={registration[field]}
                onChange={handleInputChange}
                required
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;


