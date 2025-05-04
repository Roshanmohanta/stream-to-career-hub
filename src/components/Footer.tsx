
import React from "react";
import { Link } from "react-router-dom";
import { Book, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-portal-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-6 w-6 text-portal-pink" />
              <span className="text-xl font-bold">CareerPathways</span>
            </div>
            <p className="text-gray-300 mb-4">
              Guiding students through academic and career decisions with personalized recommendations
              based on their chosen stream, providing college information and job opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-portal-pink pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-portal-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-portal-pink transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-portal-pink transition-colors">
                  Job Finder
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-portal-pink transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-portal-pink pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-portal-pink shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Education Ave, Knowledge City, IN 56789
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-portal-pink" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-portal-pink" />
                <span className="text-gray-300">info@careerpathways.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CareerPathways Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
