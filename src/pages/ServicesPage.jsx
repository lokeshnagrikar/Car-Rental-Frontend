// import MainLayout from "../layouts/MainLayout"
import {
  TruckIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

const ServicesPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Our Services</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">Comprehensive car rental solutions tailored to your needs</p>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What We Offer</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              From short-term rentals to long-term leases, we have the perfect solution for you
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Short-Term Rentals</h3>
              <p className="mt-2 text-base text-gray-500">
                Perfect for vacations, business trips, or when your car is in the shop. Rent for as little as one day.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Flexible pickup and return times
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  No long-term commitment
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Wide range of vehicles available
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Long-Term Leases</h3>
              <p className="mt-2 text-base text-gray-500">
                Ideal for extended stays or when you need a vehicle for several months without the commitment of buying.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Discounted monthly rates
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Maintenance included
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Option to swap vehicles
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Corporate Accounts</h3>
              <p className="mt-2 text-base text-gray-500">
                Specialized services for businesses with regular transportation needs and multiple drivers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Volume discounts
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated account manager
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Customized billing options
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Vehicle Maintenance</h3>
              <p className="mt-2 text-base text-gray-500">
                All our vehicles undergo regular maintenance to ensure safety and reliability during your rental.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Regular safety inspections
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  24/7 roadside assistance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Replacement vehicle if needed
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Airport Pickup & Drop-off</h3>
              <p className="mt-2 text-base text-gray-500">
                Convenient service for travelers arriving at or departing from local airports.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Meet & greet service
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Flight tracking
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  No extra fees for flight delays
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Insurance Options</h3>
              <p className="mt-2 text-base text-gray-500">
                Comprehensive coverage options to protect you during your rental period.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Collision damage waiver
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Personal accident insurance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Supplemental liability protection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">Renting a car with us is quick and easy</p>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    1
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">Choose Your Vehicle</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Browse our extensive fleet and select the perfect vehicle for your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    2
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">Book Online</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Complete your reservation with our simple online booking system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    3
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">Pick Up Your Car</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Visit our location or use our delivery service to get your vehicle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    4
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">Enjoy & Return</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Enjoy your journey and return the vehicle at the agreed time and location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Additional Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Enhance your rental experience with our premium add-ons
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">GPS Navigation</h3>
              <p className="mt-2 text-gray-500">
                Never get lost with our premium GPS navigation systems. Available for all vehicle rentals at a small
                additional fee.
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">$5 per day</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Child Safety Seats</h3>
              <p className="mt-2 text-gray-500">
                Travel safely with your little ones. We offer infant, toddler, and booster seats that meet all safety
                standards.
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">$7 per day</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Additional Driver</h3>
              <p className="mt-2 text-gray-500">
                Share the driving responsibilities by adding another qualified driver to your rental agreement.
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">$10 per day</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Roadside Assistance Plus</h3>
              <p className="mt-2 text-gray-500">
                Enhanced roadside assistance package including tire changes, jump starts, lockout service, and fuel
                delivery.
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">$8 per day</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to book your rental?</span>
            <span className="block text-blue-200">Get started in just a few clicks.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/cars"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Browse Cars
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesPage
