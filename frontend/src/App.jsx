import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Registration from './components/Registration';
import LogOut from './components/LogOut';

function App() {
  return (

    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
