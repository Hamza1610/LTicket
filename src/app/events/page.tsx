"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Event } from "@/types/events";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link
          href="/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>Price: {event.price} sats</p>
              <p>Tickets: {event.remainingTickets} remaining</p>
            </div>
            <div className="mt-4">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs ${
                  event.status === "published"
                    ? "bg-green-100 text-green-800"
                    : event.status === "draft"
                    ? "bg-gray-100 text-gray-800"
                    : event.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No events found. Create your first event!
        </div>
      )}
    </div>
  );
} 