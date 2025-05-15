
import { useState, useEffect } from "react"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon as SearchIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  TruckIcon,
  MapPinIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline"

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [openFaqs, setOpenFaqs] = useState({})
  const [filteredFaqs, setFilteredFaqs] = useState([])

  // FAQ categories with icons
  const categories = [
    { id: "all", name: "All FAQs", icon: QuestionMarkCircleIcon },
    { id: "booking", name: "Booking & Reservations", icon: BookOpenIcon },
    { id: "payments", name: "Payments & Pricing", icon: CurrencyDollarIcon },
    { id: "vehicles", name: "Vehicles & Equipment", icon: TruckIcon },
    { id: "pickup", name: "Pickup & Return", icon: MapPinIcon },
    { id: "policies", name: "Policies & Requirements", icon: DocumentTextIcon },
    { id: "damages", name: "Damages & Insurance", icon: ShieldCheckIcon },
    { id: "account", name: "Account & Membership", icon: UserIcon },
  ]

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What documents do I need to rent a car?",
      answer:
        "To rent a car, you'll need a valid driver's license, a credit card in your name for the security deposit, and a form of identification (passport or ID card). International customers may need an International Driving Permit along with their original license. Additional documentation may be required for luxury vehicles or specific rental locations.",
      category: "policies",
    },
    {
      id: 2,
      question: "How do I make a reservation?",
      answer:
        "You can make a reservation through our website, mobile app, by calling our customer service, or visiting any of our rental locations. To ensure availability, we recommend booking in advance, especially during peak travel seasons. You'll need to provide your pickup and return dates, preferred vehicle type, and personal information.",
      category: "booking",
    },
    {
      id: 3,
      question: "Can I modify or cancel my reservation?",
      answer:
        "Yes, you can modify or cancel your reservation online through your account, or by contacting our customer service. Modifications are subject to vehicle availability. For cancellations, our policy varies depending on the type of booking: prepaid reservations may incur a fee if canceled less than 24 hours before pickup, while pay-later reservations can typically be canceled without charge.",
      category: "booking",
    },
    {
      id: 4,
      question: "Is there a security deposit required?",
      answer:
        "Yes, we require a security deposit which is placed as a hold on your credit card at the time of pickup. The amount varies depending on the vehicle type, typically ranging from $200 for economy cars to $500 or more for luxury vehicles. This hold is released upon the vehicle's return, provided there are no damages or additional charges.",
      category: "payments",
    },
    {
      id: 5,
      question: "What is your fuel policy?",
      answer:
        "Our standard policy is 'full-to-full'. This means you'll receive the car with a full tank and are expected to return it with a full tank. If the car is returned with less fuel, you'll be charged for refueling plus a service fee. We also offer a prepaid fuel option where you can purchase a full tank at the beginning of your rental and return the car with any fuel level.",
      category: "policies",
    },
    {
      id: 6,
      question: "Do you offer one-way rentals?",
      answer:
        "Yes, we offer one-way rentals between many of our locations. Additional fees may apply depending on the pickup and drop-off locations. One-way rentals between different cities or states typically incur higher fees than those within the same city. Please specify your one-way rental needs when making your reservation.",
      category: "booking",
    },
    {
      id: 7,
      question: "What happens if I return the car late?",
      answer:
        "If you return the car later than the agreed time, you may be charged for an additional day or a late fee, depending on how much time has elapsed. We typically provide a grace period of 29 minutes. If you know you'll be late, please contact us as soon as possible to extend your rental and avoid unexpected charges.",
      category: "pickup",
    },
    {
      id: 8,
      question: "Can someone else drive the rental car?",
      answer:
        "Yes, additional drivers are allowed but must be registered on the rental agreement and meet the same eligibility requirements as the primary driver. There is usually an additional daily fee for each extra driver. Spouses or domestic partners may be exempt from this fee in some locations. Unregistered drivers are not covered by insurance in case of an accident.",
      category: "policies",
    },
    {
      id: 9,
      question: "What should I do if the car breaks down?",
      answer:
        "In case of a breakdown, please call our 24/7 roadside assistance number provided in your rental agreement. Depending on your location and the issue, we'll either send a mechanic to fix the problem or arrange for a replacement vehicle. Do not attempt to repair the vehicle yourself or hire a third-party service, as this may void insurance coverage.",
      category: "vehicles",
    },
    {
      id: 10,
      question: "Do you offer child safety seats?",
      answer:
        "Yes, we offer child safety seats, including infant carriers, toddler seats, and boosters, which can be reserved along with your vehicle. These are available for an additional daily fee. All our child seats meet current safety standards. We recommend booking these in advance to ensure availability, especially during peak travel seasons.",
      category: "vehicles",
    },
    {
      id: 11,
      question: "What insurance options do you offer?",
      answer:
        "We offer several insurance options: Collision Damage Waiver (CDW) which reduces your liability for vehicle damage, Supplemental Liability Insurance (SLI) which provides additional third-party liability coverage, Personal Accident Insurance (PAI) which covers medical costs for you and your passengers, and Personal Effects Coverage (PEC) which protects your belongings. Your personal auto insurance or credit card may also provide coverage.",
      category: "damages",
    },
    {
      id: 12,
      question: "Can I rent a car without a credit card?",
      answer:
        "In most locations, a credit card in the primary driver's name is required for the security deposit. Some locations may accept debit cards with additional identification and proof of return travel, but this typically involves a more stringent verification process and possibly a higher deposit. Cash rentals are available at select locations with significant advance deposits.",
      category: "payments",
    },
    {
      id: 13,
      question: "What is your minimum age requirement for renting?",
      answer:
        "The standard minimum age to rent a car is 21 years old, although some specialty vehicles may require renters to be 25 or older. Drivers under 25 may incur a 'young driver surcharge' and may be restricted from renting certain vehicle classes. The minimum age requirement can vary by location and country, so please check specific requirements for your rental location.",
      category: "policies",
    },
    {
      id: 14,
      question: "Do you offer GPS navigation systems?",
      answer:
        "Yes, we offer GPS navigation systems for an additional daily fee. These can be reserved in advance or requested at the time of pickup, subject to availability. Our GPS units are pre-loaded with maps of the region and include features like point-of-interest search and turn-by-turn directions. Many of our premium vehicles also come with built-in navigation systems.",
      category: "vehicles",
    },
    {
      id: 15,
      question: "What happens if I get a traffic ticket while driving the rental car?",
      answer:
        "You are responsible for all traffic violations, parking tickets, and toll fees incurred during your rental period. If we receive a citation after your rental, we will charge your credit card for the fine plus an administrative fee. To avoid this additional fee, please pay any tickets promptly and notify us of any citations you received during your rental.",
      category: "policies",
    },
    {
      id: 16,
      question: "Can I take the rental car across state or country borders?",
      answer:
        "Domestic travel between states is generally permitted within the continental United States. However, taking rental vehicles into Mexico is typically prohibited. Travel to Canada may be allowed with prior authorization and possibly an additional fee. Please inform us of your travel plans when making your reservation, as unauthorized border crossings may void insurance coverage.",
      category: "policies",
    },
    {
      id: 17,
      question: "How do I join your loyalty program?",
      answer:
        "You can join our loyalty program by signing up on our website, through our mobile app, or at any rental location. Membership is free and provides benefits like expedited pickup and drop-off, points toward free rental days, and special promotions. Elite tiers are available based on rental frequency or spending, offering additional perks like vehicle upgrades and dedicated customer service lines.",
      category: "account",
    },
    {
      id: 18,
      question: "What is your smoking policy for rental vehicles?",
      answer:
        "All our vehicles are non-smoking. If evidence of smoking is detected in the vehicle upon return, a cleaning fee of up to $250 may be charged to restore the vehicle to a smoke-free condition. This policy includes all forms of smoking, including e-cigarettes and vaping devices. We appreciate your cooperation in maintaining a pleasant experience for all our customers.",
      category: "policies",
    },
    {
      id: 19,
      question: "Do you offer airport pickup and drop-off?",
      answer:
        "Yes, we offer services at most major airports. At some airports, we have counters in the terminal or provide shuttle service to nearby rental facilities. For pickup, please provide your flight information when booking so we can monitor your flight status and ensure your vehicle is ready even if your flight is delayed. For drop-off, please allow sufficient time before your flight departure.",
      category: "pickup",
    },
    {
      id: 20,
      question: "What happens if I damage the rental car?",
      answer:
        "If the vehicle is damaged during your rental period, you should report it to us immediately. Your financial responsibility depends on the insurance coverage you selected. With the Collision Damage Waiver, your liability may be reduced or eliminated. Without it, you may be responsible for the full cost of repairs. We'll inspect the vehicle upon return and document any new damage.",
      category: "damages",
    },
  ]

  // Toggle FAQ open/closed state
  const toggleFaq = (id) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Filter FAQs based on search term and active category
  useEffect(() => {
    const filtered = faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory
      return matchesSearch && matchesCategory
    })
    setFilteredFaqs(filtered)
  }, [searchTerm, activeCategory])

  // Open the first few FAQs by default
  useEffect(() => {
    const initialOpenState = {}
    faqs.slice(0, 3).forEach((faq) => {
      initialOpenState[faq.id] = true
    })
    setOpenFaqs(initialOpenState)
  }, [faqs])

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Find answers to common questions about our car rental services
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-4 space-y-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const CategoryIcon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          activeCategory === category.id
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <CategoryIcon className="h-5 w-5 mr-2" />
                        {category.name}
                        {activeCategory === category.id && (
                          <span className="ml-auto bg-blue-200 text-blue-800 py-0.5 px-2 rounded-full text-xs">
                            {filteredFaqs.filter((faq) => category.id === "all" || faq.category === category.id).length}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>

                {/* Contact Support */}
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Can't find what you're looking for?</h3>
                  <p className="mt-2 text-sm text-blue-700">
                    Our customer support team is here to help you with any questions you may have.
                  </p>
                  <div className="mt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Contact Support
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === "all"
                    ? "All Frequently Asked Questions"
                    : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                {searchTerm && (
                  <div className="text-sm text-gray-500">
                    Found {filteredFaqs.length} results for "{searchTerm}"
                  </div>
                )}
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                  <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-gray-500">We couldn't find any FAQs matching your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setActiveCategory("all")
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left px-4 py-5 sm:px-6 focus:outline-none"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <span className="flex-shrink-0 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 text-sm font-semibold">Q</span>
                            </span>
                            {faq.question}
                          </h3>
                          <span className="ml-6 flex-shrink-0">
                            {openFaqs[faq.id] ? (
                              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                            )}
                          </span>
                        </div>
                        {openFaqs[faq.id] && (
                          <div className="mt-4 text-base text-gray-500 pl-9">
                            <div className="flex">
                              <span className="flex-shrink-0 mr-3 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-600 text-sm font-semibold">A</span>
                              </span>
                              <p className="pt-0.5">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination - only show if we have enough results */}
              {filteredFaqs.length > 10 && (
                <div className="mt-8 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Popular Topics</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Quick access to our most frequently asked questions by topic
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Booking Process",
                description: "How to book, modify, or cancel your reservation",
                icon: BookOpenIcon,
                link: "#",
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Payment Options",
                description: "Information about payment methods and security deposits",
                icon: CurrencyDollarIcon,
                link: "#",
                color: "bg-green-100 text-green-600",
              },
              {
                title: "Vehicle Selection",
                description: "Choosing the right car for your needs",
                icon: TruckIcon,
                link: "#",
                color: "bg-yellow-100 text-yellow-600",
              },
              {
                title: "Insurance Coverage",
                description: "Understanding your insurance options",
                icon: ShieldCheckIcon,
                link: "#",
                color: "bg-red-100 text-red-600",
              },
            ].map((topic, index) => {
              const TopicIcon = topic.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className={`h-12 w-12 rounded-md flex items-center justify-center ${topic.color}`}>
                      <TopicIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">{topic.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{topic.description}</p>
                    <div className="mt-4">
                      <a href={topic.link} className="text-blue-600 hover:text-blue-500 flex items-center">
                        Learn more
                        <svg
                          className="ml-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Additional Resources</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Explore these resources for more detailed information
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Rental Policies</h3>
                <p className="mt-2 text-base text-gray-500">
                  Detailed information about our rental terms, conditions, and policies.
                </p>
                <div className="mt-4">
                  <a href="/terms" className="text-blue-600 hover:text-blue-500 flex items-center">
                    View Policies
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">How-To Guides</h3>
                <p className="mt-2 text-base text-gray-500">
                  Step-by-step guides for booking, modifying, and managing your rentals.
                </p>
                <div className="mt-4">
                  <a href="/guides" className="text-blue-600 hover:text-blue-500 flex items-center">
                    View Guides
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Video Tutorials</h3>
                <p className="mt-2 text-base text-gray-500">
                  Watch our video tutorials for visual instructions on using our services.
                </p>
                <div className="mt-4">
                  <a href="/tutorials" className="text-blue-600 hover:text-blue-500 flex items-center">
                    Watch Videos
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Still have questions?</span>
            <span className="block text-blue-200">Our support team is here to help.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Contact Us
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="tel:+11234567890"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQPage
