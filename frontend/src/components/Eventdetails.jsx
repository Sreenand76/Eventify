import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const { id } = useParams(); // Retrieve the event ID from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details by ID from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    const eventDetails = storedEvents.find((event) => event.id === parseInt(id));
    setEvent(eventDetails);
  }, [id]);

  const handleAttendance = () => {
    if (!event) return;

    // Fetch the current list of events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events"));

    // Update the attendance count for the selected event
    const updatedEvents = storedEvents.map((e) =>
      e.id === event.id ? { ...e, attendanceCount: e.attendanceCount + 1 } : e
    );

    // Save the updated events back to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Update the event state to reflect the new attendance count
    setEvent(updatedEvents.find((e) => e.id === event.id)); // Update the current event state
  };

  if (!event) {
    return <div>Event not found!</div>;
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{event.name}</h1>
        
        <p className="text-gray-600 text-lg mb-6">{event.description}</p>
        
        <div className="mb-4">
          <strong className="text-gray-800">Event Date:</strong>
          <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-800">Attendance Count:</strong>
          <p className="text-gray-600">{event.attendanceCount}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleAttendance}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Mark as Attended
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700"
            onClick={() => window.history.back()} // Go back to previous page
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
