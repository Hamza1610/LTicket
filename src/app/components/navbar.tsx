"use client"

import React from 'react'
import { Ticket  } from "lucide-react";

function navbar() {
  return (
          <nav className="bg-black px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Ticket className="text-orange-500" size={24} />
            <span className="text-white font-bold text-xl">BitTicket</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
            <a href="#for-organizers" className="text-gray-300 hover:text-white">For Organizers</a>
            <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
          </div>
          <div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-medium">Join Waitlist</button>
          </div>
        </div>
      </nav>
  )
}

export default navbar



