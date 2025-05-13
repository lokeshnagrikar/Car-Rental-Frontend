// ContactUsPage.jsx

import { useState } from "react"
import {  MapPinIcon, EnvelopeIcon , PhoneIcon,  CheckCircleIcon } from "@heroicons/react/24/outline"

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const locations = [
    {
      name: "Main Office",
      address: "123 Car Rental Street, Anytown, AN 12345",
      phone: "+1 (555) 123-4567",
      email: "info@carrental.com",
      hours: "Monday-Friday: 8am-6pm, Saturday: 9am-4pm, Sunday: Closed",
    },
    {
      name: "Downtown Location",
      address: "456 Downtown Ave, Anytown, AN 12345",
      phone: "+1 (555) 234-5678",
      email: "downtown@carrental.com",
      hours: "Monday-Friday: 8am-8pm, Saturday-Sunday: 9am-5pm",
    },
    {
      name: "Airport Location",
      address: "789 Airport Road, Anytown, AN 12345",
      phone: "+1 (555) 345-6789",
      email: "airport@carrental.com",
      hours: "Daily: 6am-11pm",
    },
  ]

  const validate = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email address is invalid"
    if (!formData.message.trim()) errors.message = "Message is required"
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validate()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)
      setSubmitError("")

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Successful submission
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } catch (error) {
        setSubmitError("There was an error sending your message. Please try again later.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-primary-700">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/placeholder.svg?height=400&width=1200" alt="Contact us" />
          <div className="absolute inset-0 bg-primary-700 opacity-90" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            We're here to help with any questions about our vehicles, rentals, or services. Reach out to our team.
          </p>
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa28"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
          </svg>

          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Have questions about our service or need assistance? Fill out the form below and we'll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="mt-12">
            {submitSuccess ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Thank you for reaching out! Our team will get back to you shortly.</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <button
                          type="button"
                          onClick={() => setSubmitSuccess(false)}
                          className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={`py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md ${
                        formErrors.name ? "border-red-300" : ""
                      }`}
                    />
                    {formErrors.name && <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md ${
                        formErrors.email ? "border-red-300" : ""
                      }`}
                    />
                    {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <span id="phone-optional" className="text-sm text-gray-500">
                      Optional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                      aria-describedby="phone-optional"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <span id="message-max" className="text-sm text-gray-500">
                      Max. 500 characters
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md ${
                        formErrors.message ? "border-red-300" : ""
                      }`}
                      aria-describedby="message-max"
                    ></textarea>
                    {formErrors.message && <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>}
                  </div>
                </div>

                {submitError && (
                  <div className="sm:col-span-2">
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Submission error</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{submitError}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-3 md:gap-8">
            {locations.map((location) => (
              <div key={location.name}>
                <h2 className="text-2xl font-bold text-gray-900">{location.name}</h2>
                <div className="mt-3">
                  <p className="text-lg text-gray-500">{location.address}</p>
                </div>
                <div className="mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>{location.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>{location.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex">
                    <div className="flex-shrink-0">
                      <MapPinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p className="font-semibold">Business Hours:</p>
                      <p>{location.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map section - Placeholder for an actual map */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Find Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Visit one of our convenient locations or contact us for a car delivery service.
            </p>
          </div>
          <div className="mt-10 rounded-lg overflow-hidden shadow-xl">
            {/* This would be replaced with an actual map component like Google Maps */}
            <div className="relative h-96 bg-gray-200">
              <img
                src="/placeholder.svg?height=500&width=1200"
                alt="Map location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md">
                 <MapPinIcon className="w-5 h-5 text-white" />
                  <p className="mt-2 font-semibold text-gray-900">Main Office</p>
                  <p className="text-sm text-gray-500">123 Car Rental Street, Anytown</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently Asked Questions</h2>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">What documents do I need to rent a car?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  You'll need a valid driver's license, a credit card in your name, and proof of insurance.
                  International customers may need additional documentation.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">Do you offer airport pickup?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, we offer shuttle service to and from the airport. Please let us know your flight details when
                  booking.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">What is your cancellation policy?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Cancellations made at least 48 hours before pickup time receive a full refund. Late cancellations may
                  be subject to a fee.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">Can someone else drive the rental car?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Additional drivers must be registered and meet our standard rental requirements. There may be an
                  additional fee.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">Do you offer long-term rentals?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, we offer special rates for rentals longer than a week. Contact us for custom quotes on extended
                  rentals.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">What happens if I return the car late?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Late returns may incur additional hourly or daily charges. Please contact us if you need to extend
                  your rental.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
