import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for Toastify

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    // Check if events are already in localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    } else {
      // Default events if none found in localStorage
      const defaultEvents = [
        {
          id: 1,
          name: "Tech Conference 2025",
          date: "2025-06-12",
          description: "Join us for the biggest tech conference of the year.",
          attendanceCount: 0,
          attendees: [],
        },
        {
          id: 2,
          name: "Music Festival",
          date: "2025-07-20",
          description: "Enjoy live music from top bands at the annual music festival.",
          attendanceCount: 0,
          attendees: [],
        },
        {
          id: 3,
          name: "Health and Wellness Workshop",
          date: "2025-05-10",
          description: "Learn tips on maintaining mental and physical health from experts.",
          attendanceCount: 0,
          attendees: [],
        },
        {
          id: 4,
          name: "AI and Machine Learning Meetup",
          date: "2025-08-05",
          description: "Explore the latest trends in AI and machine learning with industry leaders.",
          attendanceCount: 0,
          attendees: [],
        },
      ];

      // Store the default events in localStorage
      localStorage.setItem("events", JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    }

    // Generate a user ID if it doesn't exist in localStorage
    if (!userId) {
      const newUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, [userId]);

  const handleAttendance = (eventId) => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    const updatedEvents = storedEvents.map((event) => {
      if (event.id === eventId) {
        if (event.attendees.includes(userId)) {
          // If already attended, show unregister option
          return event; // No changes to event, just show the "Unregister" button
        }
        // Register for the event
        return {
          ...event,
          attendanceCount: event.attendanceCount + 1,
          attendees: [...event.attendees, userId], // Add userId to the attendees list
        };
      }
      return event;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents); // Update the state
  };

  const handleUnregister = (eventId) => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    const updatedEvents = storedEvents.map((event) => {
      if (event.id === eventId) {
        // Unregister from the event by removing the userId from attendees
        const filteredAttendees = event.attendees.filter((attendee) => attendee !== userId);
        return {
          ...event,
          attendanceCount: event.attendanceCount - 1,
          attendees: filteredAttendees,
        };
      }
      return event;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents); // Update the state
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Upcoming Events
        </h1>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-gray-500 mt-2">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mt-2">
                <strong>Attendance Count:</strong> {event.attendanceCount}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/event/${event.id}`}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                >
                  View Details
                </Link>

                {/* Show "Unregister" button if the user has already attended the event */}
                {event.attendees.includes(userId) ? (
                  <button
                    onClick={() => handleUnregister(event.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    onClick={() => handleAttendance(event.id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default EventPage;
