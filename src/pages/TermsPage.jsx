const TermsPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gray-900 shadow-xl">
          <div className="absolute inset-0 overflow-hidden">
            <img
              className="h-full w-full object-cover transform scale-105 motion-safe:hover:scale-100 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt="Terms and Conditions"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" aria-hidden="true"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300 animate-fade-in">
              Terms and Conditions
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed border-l-4 border-indigo-500 pl-6">
              Please read these terms and conditions carefully before using our car rental services.
            </p>
          </div>
        </div>
  
        {/* Terms Content */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <div className="space-y-16">
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using our car rental services, you agree to be bound by these Terms and Conditions and all
                  applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using
                  or accessing our services.
                </p>
              </section>
  
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Rental Requirements</h2>
                <p className="text-gray-600 mb-4">To rent a vehicle from CarRental, you must:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-center space-x-3 text-gray-600">
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Be at least 21 years of age (25 for premium vehicles)</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-600">
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Possess a valid driver's license that has been held for at least one year</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-600">
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Present a valid credit card in your name for the security deposit</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-600">
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Meet our insurance and credit requirements</span>
                  </li>
                </ul>
              </section>
  
              {/* Continue the same pattern for other sections */}
              
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Contact Information</h2>
                <p className="text-gray-600 mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 space-y-2">
                    <strong className="block text-gray-900">CarRental</strong>
                    <span className="block">123 Rental Street</span>
                    <span className="block">Automotive City, AC 12345</span>
                    <span className="block">Phone: <a href="tel:+11234567890" className="text-indigo-600 hover:text-indigo-800">+1 (123) 456-7890</a></span>
                    <span className="block">Email: <a href="mailto:legal@carrental.com" className="text-indigo-600 hover:text-indigo-800">legal@carrental.com</a></span>
                  </p>
                </div>
  
                <p className="text-sm text-gray-500 mt-8 italic">Last updated: May 10, 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default TermsPage