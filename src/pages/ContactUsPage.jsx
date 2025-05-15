
import { useState } from "react"

import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline"

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    })

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Contact Us</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              We're here to help with any questions about our car rental services
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Phone</h3>
              <p className="mt-2 text-base text-gray-500">
                <a href="tel:+11234567890" className="hover:text-blue-600">
                  +1 (123) 456-7890
                </a>
              </p>
              <p className="mt-1 text-base text-gray-500">
                <a href="tel:+18001234567" className="hover:text-blue-600">
                  +1 (800) 123-4567
                </a>{" "}
                (Toll-free)
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-base text-gray-500">
                <a href="mailto:info@carrental.com" className="hover:text-blue-600">
                  info@carrental.com
                </a>
              </p>
              <p className="mt-1 text-base text-gray-500">
                <a href="mailto:support@carrental.com" className="hover:text-blue-600">
                  support@carrental.com
                </a>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Location</h3>
              <p className="mt-2 text-base text-gray-500">123 Rental Street</p>
              <p className="mt-1 text-base text-gray-500">Automotive City, AC 12345</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Business Hours</h3>
              <p className="mt-2 text-base text-gray-500">Monday - Friday: 8AM - 8PM</p>
              <p className="mt-1 text-base text-gray-500">Saturday - Sunday: 9AM - 5PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                {formStatus.submitted && formStatus.success ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    {formStatus.message}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
              <div className="bg-white rounded-lg shadow-md p-2 h-[500px]">
                {/* Placeholder for map - in a real application, you would integrate Google Maps or similar */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-gray-500">Map would be displayed here</p>
                    <p className="text-sm text-gray-400">123 Rental Street, Automotive City, AC 12345</p>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Getting Here</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">By Car</h4>
                    <p className="text-gray-500">
                      From downtown, take Main Street north for 2 miles, then turn right onto Rental Street. Our office
                      is on the left side.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">By Public Transport</h4>
                    <p className="text-gray-500">
                      Take bus #42 or #56 to the Automotive City stop. We're a 2-minute walk from the bus stop.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">From the Airport</h4>
                    <p className="text-gray-500">
                      We offer a complimentary shuttle service from the airport. Please call us when you arrive, and
                      we'll send a shuttle to pick you up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">Find quick answers to common questions</p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What documents do I need to rent a car?",
                  answer:
                    "You'll need a valid driver's license, a credit card in your name, and a form of identification (passport or ID card). International customers may need additional documentation.",
                },
                {
                  question: "Can I modify or cancel my reservation?",
                  answer:
                    "Yes, you can modify or cancel your reservation online or by contacting our customer service. Cancellation policies vary depending on the type of booking.",
                },
                {
                  question: "Is there a security deposit required?",
                  answer:
                    "Yes, we require a security deposit which is typically placed as a hold on your credit card. The amount varies depending on the vehicle type.",
                },
                {
                  question: "Do you offer airport pickup and drop-off?",
                  answer:
                    "Yes, we offer airport pickup and drop-off services. Please provide your flight details when making your reservation.",
                },
                {
                  question: "What is your fuel policy?",
                  answer:
                    "Our standard policy is 'full-to-full'. This means you'll receive the car with a full tank and are expected to return it with a full tank. If the car is returned with less fuel, you'll be charged for refueling plus a service fee.",
                },
                {
                  question: "Do you offer one-way rentals?",
                  answer:
                    "Yes, we offer one-way rentals between many of our locations. Additional fees may apply depending on the pickup and drop-off locations.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a href="/faq" className="inline-flex items-center text-blue-600 hover:text-blue-500">
                View all FAQs
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Book your car rental today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/cars"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Browse Cars
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUsPage
// 