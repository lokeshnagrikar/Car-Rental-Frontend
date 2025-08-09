import { Link } from "react-router-dom"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const AboutUsPage = () => {
  // Company team members
  const team = [
    {
      name: "Jane Cooper",
      role: "CEO & Founder",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bio: "With over 15 years in the car rental industry, Jane founded CarRental with a vision to transform the rental experience.",
    },
    {
      name: "Michael Foster",
      role: "Operations Director",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bio: "Michael ensures our fleet is maintained to the highest standards and operations run smoothly.",
    },
    {
      name: "Dries Vincent",
      role: "Customer Experience Manager",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bio: "Dries is dedicated to ensuring every customer has an exceptional experience from booking to return.",
    },
    {
      name: "Lindsay Walton",
      role: "Head of Marketing",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bio: "Lindsay develops our brand strategy and ensures CarRental reaches customers who value quality service.",
    },
  ]

  // Company timeline/milestones
  const timeline = [
    {
      year: "2010",
      title: "CarRental Founded",
      description: "Started with a small fleet of 10 vehicles in one location.",
    },
    {
      year: "2014",
      title: "Expanded to 5 Cities",
      description: "Grew our presence across the region with a fleet of 100+ vehicles.",
    },
    {
      year: "2017",
      title: "Launched Luxury Fleet",
      description: "Introduced premium and luxury vehicles to our growing selection.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our mobile app and enhanced online booking experience.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Added electric and hybrid vehicles to our fleet with carbon offset program.",
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/placeholder.svg?height=500&width=1200"
            alt="Company office"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            We're not just renting cars; we're providing the freedom to explore, the reliability to depend on, and the
            quality to enjoy every journey.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Story</h2>
              <div className="mt-10 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-10">
                  <p>
                    Founded in 2010, CarRental began with a simple mission: to provide high-quality, reliable vehicles
                    at competitive prices with exceptional customer service.
                  </p>
                  <p>
                    What started as a small fleet of 10 vehicles has grown into a comprehensive operation with hundreds
                    of vehicles across multiple locations. Throughout our growth, we've maintained our commitment to
                    personalized service and customer satisfaction.
                  </p>
                  <p>
                    Our team consists of industry experts who understand that renting a car isn't just about the vehicle
                    — it's about providing freedom, reliability, and peace of mind for your journey.
                  </p>
                  <p>
                    Today, we're proud to offer one of the region's most diverse fleets, from economical compact cars to
                    luxury vehicles, all maintained to the highest standards of safety and comfort.
                  </p>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                  <img
                    className="rounded-lg shadow-lg object-cover"
                    src="/placeholder.svg?height=500&width=600"
                    alt="Company history"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What drives us forward
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our core values guide every decision we make and every interaction we have.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customer First</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We prioritize customer needs in every decision we make, ensuring your experience exceeds expectations.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Safety & Reliability</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We maintain our fleet to the highest standards to ensure your safety and vehicle reliability.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Innovation</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We continuously innovate our services and processes to provide the best possible rental experience.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Sustainability</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We're committed to reducing our environmental impact through fuel-efficient vehicles and green
                  practices.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Company Timeline */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Company Timeline</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Journey So Far
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              See how we've grown and evolved over the years.
            </p>
          </div>

          <div className="mt-12">
            <div className="flow-root">
              <ul className="-mb-8">
                {timeline.map((item, itemIdx) => (
                  <li key={item.year}>
                    <div className="relative pb-8">
                      {itemIdx !== timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              className="h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{item.title}</span> - {item.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={item.year}>{item.year}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-300">
                Our experienced leadership team is committed to providing exceptional service and innovation in the car
                rental industry.
              </p>
            </div>
            <ul
              className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-4 lg:max-w-5xl"
            >
              {team.map((person) => (
                <li key={person.name}>
                  <div className="space-y-6">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover"
                      src={person.imageUrl || "/placeholder.svg"}
                      alt={person.name}
                    />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3 className="text-white">{person.name}</h3>
                        <p className="text-primary-400">{person.role}</p>
                      </div>
                      <p className="text-base text-gray-400">{person.bio}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to experience our service?</span>
            <span className="block text-primary-300">Start your journey with us today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Browse Our Fleet
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
