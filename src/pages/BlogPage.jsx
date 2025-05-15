import React from "react"
import { Link } from "react-router-dom"
// import MainLayout from "../layouts/MainLayout"
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

const BlogPage = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Smooth Car Rental Experience",
      excerpt: "Planning to rent a car for your next trip? Check out these essential tips to ensure a hassle-free rental experience from start to finish.",
      image: "/placeholder.svg?height=300&width=600",
      date: "May 15, 2023",
      author: "John Smith",
      readTime: "5 min read",
      category: "Tips & Advice"
    },
    {
      id: 2,
      title: "The Best Road Trips to Take This Summer",
      excerpt: "Discover the most scenic and exciting road trip routes that are perfect for your summer adventure. From coastal drives to mountain escapes.",
      image: "/placeholder.svg?height=300&width=600",
      date: "June 2, 2023",
      author: "Sarah Johnson",
      readTime: "8 min read",
      category: "Travel"
    },
    {
      id: 3,
      title: "Electric vs. Hybrid Cars: Which Should You Rent?",
      excerpt: "With more eco-friendly options available in rental fleets, learn the pros and cons of electric and hybrid vehicles for your next rental.",
      image: "/placeholder.svg?height=300&width=600",
      date: "June 18, 2023",
      author: "Michael Chen",
      readTime: "6 min read",
      category: "Car Technology"
    },
    {
      id: 4,
      title: "Understanding Car Rental Insurance Options",
      excerpt: "Confused about rental car insurance? This comprehensive guide breaks down all the coverage options to help you make an informed decision.",
      image: "/placeholder.svg?height=300&width=600",
      date: "July 5, 2023",
      author: "Emily Rodriguez",
      readTime: "7 min read",
      category: "Insurance"
    },
    {
      id: 5,
      title: "Family-Friendly Vehicles: Choosing the Right Rental for Your Vacation",
      excerpt: "Planning a family trip? Find out which vehicles offer the best combination of space, safety, and comfort for traveling with children.",
      image: "/placeholder.svg?height=300&width=600",
      date: "July 22, 2023",
      author: "David Kim",
      readTime: "5 min read",
      category: "Family Travel"
    },
    {
      id: 6,
      title: "Business Travel: Car Rental Tips for Professionals",
      excerpt: "Streamline your business travel with these expert tips on renting cars for corporate trips, including loyalty programs and expense management.",
      image: "/placeholder.svg?height=300&width=600",
      date: "August 10, 2023",
      author: "Lisa Patel",
      readTime: "6 min read",
      category: "Business Travel"
    }
  ]

  // Sample categories
  const categories = [
    "All Categories",
    "Tips & Advice",
    "Travel",
    "Car Technology",
    "Insurance",
    "Family Travel",
    "Business Travel",
    "Maintenance",
    "Industry News"
  ]

  // Sample recent posts
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Our Blog</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Insights, tips, and stories from the world of car rentals
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <div className="lg:flex lg:items-center lg:justify-between bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <div className="lg:w-1/2">
              <img 
                src="/placeholder.svg?height=400&width=800" 
                alt="Featured post" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8 lg:w-1/2">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                Car Technology
              </div>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                The Future of Car Rentals: Autonomous Vehicles
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                Explore how self-driving technology is set to revolutionize the car rental industry in the coming years, and what this means for travelers and rental companies alike.
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">James Wilson</p>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      April 28, 2023
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      10 min read
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/blog/future-of-car-rentals"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Read Full Article
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
              <div className="grid gap-10">
                {blogPosts.map((post) => (
                  <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                      <img className="h-48 w-full object-cover" src={post.image || "/placeholder.svg"} alt={post.title} />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-600">
                          {post.category}
                        </p>
                        <Link to={`/blog/${post.id}`} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                          <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                        </Link>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/placeholder.svg?height=40&width=40"
                            alt={post.author}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {post.date}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          aria-current="page"
                          className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          1
                        </button>
                        <button
                          type="button"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          2
                        </button>
                        <button
                          type="button"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          3
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                        <button
                          type="button"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          8
                        </button>
                        <button
                          type="button"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          9
                        </button>
                        <button
                          type="button"
                          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          10
                        </button>
                        <button
                          type="button"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-12 lg:mt-0 lg:col-span-4">
              <div className="sticky top-4 space-y-8">
                {/* Search */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="Search articles..."
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                  <div className="mt-2 space-y-2">
                    {categories.map((category, index) => (
                      <Link
                        to={`/blog/category/${category}`}
                        key={index}
                        href="#"
                        className={`block px-3 py-2 rounded-md text-sm ${
                          index === 0
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Posts</h3>
                  <div className="mt-2 space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded object-cover"
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h4>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-blue-700 shadow-md rounded-lg p-6 text-white">
                  <h3 className="text-lg font-medium mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-blue-100 mb-4">
                    Get the latest articles, tips, and offers delivered directly to your inbox.
                  </p>
                  <form className="mt-4">
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your email address"
                    />
                    <button
                      type="submit"
                      className="mt-3 w-full bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-50"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
