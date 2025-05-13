const PrivacyPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gray-900 shadow-xl">
          <div className="absolute inset-0 overflow-hidden">
            <img
              className="h-full w-full object-cover transform scale-105 motion-safe:hover:scale-100 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Privacy Policy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" aria-hidden="true"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300 animate-fade-in">
              Privacy Policy
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed border-l-4 border-indigo-500 pl-6">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information.
            </p>
          </div>
        </div>
  
        {/* Privacy Content */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <div className="space-y-16">
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    CarRental ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
                    we collect, use, disclose, and safeguard your information when you use our car rental services, website, or
                    mobile application.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have
                    read, understood, and agree to be bound by all the terms of this Privacy Policy.
                  </p>
                </div>
              </section>
  
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">2.1 Personal Information</h3>
                    <ul className="space-y-3 list-none pl-0">
                      {[
                        "Contact information (name, email address, phone number, postal address)",
                        "Identification information (driver's license, passport)",
                        "Payment information (credit card details, billing address)",
                        "Demographic information (age, date of birth)",
                        "Driving history and insurance information"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3 text-gray-600">
                          <svg className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
  
                  {/* Similar styling for other sections */}
                </div>
              </section>
  
              {/* Contact Section */}
              <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Contact Us</h2>
                <p className="text-gray-600 mb-6">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors duration-300">
                  <div className="space-y-3">
                    <p className="text-gray-900 font-semibold text-lg">CarRental</p>
                    <div className="space-y-1 text-gray-600">
                      <p>123 Rental Street</p>
                      <p>Automotive City, AC 12345</p>
                      <p className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:+11234567890" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">+1 (123) 456-7890</a>
                      </p>
                      <p className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:privacy@carrental.com" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">privacy@carrental.com</a>
                      </p>
                    </div>
                  </div>
                </div>
  
                <p className="text-sm text-gray-500 mt-8 italic">Last updated: May 10, 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PrivacyPage