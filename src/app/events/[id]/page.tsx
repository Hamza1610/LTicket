"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Event } from "@/types/events";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      setError("Failed to load event details");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!event) return;

    try {
      const response = await fetch(`/api/events/${event.id}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: ticketQuantity,
          paymentMethod: event.paymentMethod,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to purchase tickets");
      }

      const { paymentRequest } = await response.json();
      // TODO: Handle payment flow
      console.log("Payment request:", paymentRequest);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to purchase tickets");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-600">{error || "Event not found"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>{new Date(event.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{event.location}</span>
            <span>•</span>
            <span>{event.remainingTickets} tickets remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About this event</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                  <dd className="mt-1 text-gray-900">
                    {new Date(event.date).toLocaleString()}
                  </dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-gray-900">{event.location}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-gray-900 capitalize">{event.paymentMethod}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Purchase Tickets</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Number of Tickets
                  </label>
                  <select
                    id="quantity"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(5, event.remainingTickets))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Price per ticket</span>
                    <span>{event.price} sats</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total</span>
                    <span>{event.price * ticketQuantity} sats</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={event.remainingTickets === 0}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {event.remainingTickets === 0 ? "Sold Out" : "Purchase Tickets"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 