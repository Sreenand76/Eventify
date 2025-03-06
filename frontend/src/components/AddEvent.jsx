import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Handle form submission
  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventDescription) {
      toast.error("Please fill all the fields!");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
      description: eventDescription,
      attendanceCount: 0,
      attendees: [],
    };

    // Get existing events from localStorage or create an empty array if none
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents.push(newEvent);

    // Save the new events list to localStorage
    localStorage.setItem("events", JSON.stringify(storedEvents));

    // Clear the form fields after submission
    setEventName("");
    setEventDate("");
    setEventDescription("");

    // Display success toast
    toast.success("Event added successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Add New Event
        </h1>

        <form onSubmit={handleAddEvent} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows="4"
              className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 w-full"
          >
            Add Event
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AddEvent;

