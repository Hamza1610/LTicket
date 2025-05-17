"use client"

import React from 'react'
import { Ticket  } from "lucide-react";

function footer() {
  return (
          <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Ticket className="text-orange-500" size={24} />
                <span className="font-bold text-xl">BitTicket</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing event ticketing through Bitcoin technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">© 2025 BitTicket. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default footer



