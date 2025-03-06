import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Registration from './components/Registration';
import LogOut from './components/LogOut';
import Navbar from './components/NavBar';
import EventPage from './components/EventPage';
import EventDetailPage from './components/Eventdetails';
import AddEvent from './components/AddEvent';

function App() {
  return (

    <BrowserRouter>
    <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<EventPage/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/login" element={<Login/>} />
        <Route  path="/add-event" element={<AddEvent/>} />
        <Route path="/logout" element={<LogOut/>}/>
        <Route path="/signup" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
