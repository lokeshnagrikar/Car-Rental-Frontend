import { Link } from "react-router-dom"
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
 
} from "@heroicons/react/24/outline"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CarRental</h3>
            <p className="text-gray-400 mb-4">
              Providing premium car rental services since 2010. Our mission is to offer reliable, convenient, and
              affordable transportation solutions.
            </p>
            <div className="flex space-x-4">
          <a href="https://facebook.com"><FaFacebookF className="w-6 h-6 text-blue-600" /></a>
          <a href="https://twitter.com"><FaTwitter className="w-6 h-6 text-blue-400" /></a>
          <a href="https://instagram.com"><FaInstagram className="w-6 h-6 text-pink-500" /></a>
          <a href="https://linkedin.com"><FaLinkedin className="w-6 h-6 text-pink-500" /></a>
          </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Our Cars
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Rental Street
                  <br />
                  Automotive City, AC 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@carrental.com" className="text-gray-400 hover:text-white">
                  info@carrental.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  required
                  className="min-w-0 flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {currentYear} CarRental. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <img src="/placeholder.svg?height=30&width=200" alt="Payment methods" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
