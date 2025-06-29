'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Air Ticket Reservation</span>
            </div>
            <p className="text-gray-400">
              Your trusted travel partner for amazing adventures around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/estiakahmed.tusher/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a
                href="https://x.com/EstiakA74501023"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a
                href="https://www.linkedin.com/in/estiak-ahmed/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a
                href="https://github.com/estiakahmed98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Press</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Flight Booking</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Hotel Booking</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Travel Packages</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Car Rental</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Air Ticket Reservation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;