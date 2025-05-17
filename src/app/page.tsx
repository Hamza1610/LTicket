"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Ticket, ShieldCheck, RefreshCw, Users, BarChart, Zap, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thanks for your interest! We'll notify ${email} when we launch.`);
    setEmail("");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-r from-black to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Event Ticketing <span className="text-orange-500">Reimagined</span> with Bitcoin
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The first truly decentralized ticketing platform where tickets are issued as Bitcoin invoices. 
                Transparent, secure, and fair for everyone.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-medium flex items-center justify-center">
                  Create Event <ChevronRight className="ml-2" size={18} />
                </button>
                <button className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black font-medium flex items-center justify-center">
                  How It Works
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg p-2 bg-gradient-to-r from-orange-500 to-yellow-500">
                <div className="bg-black rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 text-white p-2 rounded-full">
                      <Ticket size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">Crypto Music Festival</h3>
                      <p className="text-gray-400">June 15-17, 2025</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>Price:</span>
                      <span className="font-medium">0.005 BTC</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Network Fee:</span>
                      <span className="font-medium">~1,000 sats</span>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 text-white mt-6 py-2 rounded hover:bg-orange-600 flex items-center justify-center">
                    <Zap size={18} className="mr-2" /> Pay with Lightning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BitTicket?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform leverages Bitcoin technology to create a transparent, secure, and fair 
              ticketing ecosystem for event organizers and attendees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-orange-100 p-4 rounded-full inline-flex mb-4">
                <ShieldCheck className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verifiable Ownership</h3>
              <p className="text-gray-600">
                Every ticket is a Bitcoin transaction. Ownership is verified on the blockchain, 
                eliminating counterfeits and scams.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-orange-100 p-4 rounded-full inline-flex mb-4">
                <RefreshCw className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Controlled Resale</h3>
              <p className="text-gray-600">
                Organizers set resale parameters. Secondary market transactions are transparent and 
                can include royalties to creators.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-orange-100 p-4 rounded-full inline-flex mb-4">
                <Users className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Decentralized Control</h3>
              <p className="text-gray-600">
                No central authority means no single point of failure. The platform runs as long as 
                Bitcoin does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How BitTicket Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple flow for both organizers and attendees, powered by Bitcoin.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-500">For Organizers</h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Create Event</h4>
                      <p className="text-gray-600">Define event details, ticket types, and pricing.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Set Parameters</h4>
                      <p className="text-gray-600">Configure resale settings, royalties, and verification methods.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Receive Payments</h4>
                      <p className="text-gray-600">Get Bitcoin payments directly to your wallet without middlemen.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-500">For Attendees</h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Purchase Tickets</h4>
                      <p className="text-gray-600">Pay with Bitcoin (Lightning or on-chain) to secure your ticket.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Store Securely</h4>
                      <p className="text-gray-600">Your ticket is stored in your Bitcoin wallet as a transaction.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold mb-2">Resell if Needed</h4>
                      <p className="text-gray-600">Transfer tickets to others according to organizer rules.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Organizers Section */}
      <section id="for-organizers" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">For Event Organizers</h2>
              <p className="text-xl text-gray-300 mb-8">
                Take control of your event ticketing with powerful tools that put you in charge.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded mr-4 flex-shrink-0">
                    <BarChart size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                    <p className="text-gray-400">Track sales, attendance, and secondary market activity with detailed analytics.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded mr-4 flex-shrink-0">
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secondary Market Royalties</h3>
                    <p className="text-gray-400">Earn a percentage of each resale transaction automatically.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded mr-4 flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fraud Prevention</h3>
                    <p className="text-gray-400">Blockchain verification ensures only valid tickets are accepted.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Upcoming Organizer Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-300">
                    <ArrowRight className="text-orange-500 mr-3" size={16} />
                    <span>Custom branding for event pages</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <ArrowRight className="text-orange-500 mr-3" size={16} />
                    <span>Multi-signature wallet support</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <ArrowRight className="text-orange-500 mr-3" size={16} />
                    <span>Dynamic pricing models</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <ArrowRight className="text-orange-500 mr-3" size={16} />
                    <span>Automatic payouts to multiple stakeholders</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <ArrowRight className="text-orange-500 mr-3" size={16} />
                    <span>NFT collectible integration</span>
                  </li>
                </ul>
                <button className="w-full bg-orange-500 text-white mt-6 py-3 rounded hover:bg-orange-600 font-medium">
                  Early Access Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees. Just Bitcoin network costs and a small platform fee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-gray-600 mb-4">For small events</p>
                <p className="text-4xl font-bold">1%</p>
                <p className="text-gray-600">+ Bitcoin network fees</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-400">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Up to 200 tickets</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Basic event page</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Lightning & on-chain support</span>
                </li>
              </ul>
              <Link href="/create/page.tsx">
              <button className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 font-medium">
                Get Started
              </button>
              </Link>
            </div>

            <div className="bg-orange-500 p-8 rounded-xl shadow-lg transform md:scale-105">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <p className="text-orange-100 mb-4">For medium events</p>
                <p className="text-4xl font-bold text-white">0.8%</p>
                <p className="text-orange-100">+ Bitcoin network fees</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <ArrowRight className="text-white mr-3" size={16} />
                  <span>Up to 1,000 tickets</span>
                </li>
                <li className="flex items-center text-white">
                  <ArrowRight className="text-white mr-3" size={16} />
                  <span>Custom event page</span>
                </li>
                <li className="flex items-center text-white">
                  <ArrowRight className="text-white mr-3" size={16} />
                  <span>Lightning & on-chain support</span>
                </li>
                <li className="flex items-center text-white">
                  <ArrowRight className="text-white mr-3" size={16} />
                  <span>Secondary market controls</span>
                </li>
                <li className="flex items-center text-white">
                  <ArrowRight className="text-white mr-3" size={16} />
                  <span>Analytics dashboard</span>
                </li>
              </ul>

              <Link href="/create/page.tsx">
              <button className="w-full bg-white text-orange-500 py-3 rounded hover:bg-gray-100 font-medium">
                Get Started
              </button>
              </Link>
              
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For large events</p>
                <p className="text-4xl font-bold">0.5%</p>
                <p className="text-gray-600">+ Bitcoin network fees</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Unlimited tickets</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Fully branded experience</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Priority Lightning node</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Full resale customization</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="text-orange-500 mr-3" size={16} />
                  <span>Dedicated support</span>
                </li>
              </ul>

              <Link href="/create/page.tsx">
              <button className="w-full bg-white text-orange-500 py-3 rounded hover:bg-gray-100 font-medium">
                Get Started
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Waitlist</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Be among the first to use BitTicket when we launch. Get early access and special offers.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-400 rounded-l focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-r hover:bg-orange-600 font-medium"
            >
              Join Now
            </button>
          </form>
        </div>
      </section>

      <div> <Footer/></div>
    </div>
  );
}