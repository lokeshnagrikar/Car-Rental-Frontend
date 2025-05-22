
import { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Traveler",
    image: "/Placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The car rental service was exceptional! The vehicle was clean, well-maintained, and the pickup process was seamless. I will definitely use this service again for my business trips.",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Vacation",
    image: "/Placeholder.svg?height=80&width=80",
    rating: 5,
    text: "We rented an SUV for our family vacation and it was perfect. The car was spacious, comfortable, and fuel-efficient. The staff was friendly and helpful throughout the process.",
    featured: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Weekend Getaway",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "Quick and easy rental process. The car was in great condition and made our weekend trip so much more enjoyable. Would recommend to anyone looking for a reliable rental service.",
    featured: true,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Road Trip Enthusiast",
    image: "/Placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I've rented from many companies before, but this one stands out. The prices are competitive, the cars are top-notch, and the customer service is unmatched. My go-to rental service now!",
    featured: false,
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "City Explorer",
    image: "/Placeholder.svg?height=80&width=80",
    rating: 4,
    text: "Rented a compact car for city exploration and it was perfect. Easy to park, good on gas, and comfortable for daily driving. The online booking system was straightforward and user-friendly.",
    featured: false,
  },
  {
    id: 6,
    name: "Robert Wilson",
    role: "Business Owner",
    image: "/Placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As a business owner who travels frequently, I appreciate the consistency and reliability of this car rental service. The vehicles are always in excellent condition and the staff is professional.",
    featured: false,
  },
]

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const featuredTestimonials = testimonials.filter((t) => t.featured)
  const regularTestimonials = testimonials.filter((t) => !t.featured)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredTestimonials.length])

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? featuredTestimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} />)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers are saying about our car rental service.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mt-12 relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-full">
            <div className="px-6 py-10 sm:px-10 sm:py-16 md:p-16 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={featuredTestimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={featuredTestimonials[currentTestimonial].name}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {featuredTestimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-sm text-gray-500">{featuredTestimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  {renderStars(featuredTestimonials[currentTestimonial].rating)}
                </div>
                <blockquote className="mt-6">
                  <p className="text-xl font-medium text-gray-900">"{featuredTestimonials[currentTestimonial].text}"</p>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-6 right-6 flex space-x-3">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full ${currentTestimonial === index ? "bg-blue-600" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                />
                <div>
                  <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mt-2">{renderStars(testimonial.rating)}</div>
              <blockquote className="mt-3">
                <p className="text-sm text-gray-600">"{testimonial.text}"</p>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">Ready to experience our exceptional service?</p>
          <a
            href="/cars"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Our Cars
          </a>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
