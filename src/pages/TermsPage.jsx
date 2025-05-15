

const TermsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Terms & Conditions</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue mx-auto">
            <p className="text-gray-500">Last updated: May 14, 2023</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to CarRental ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service")
              govern your use of our website and services operated by CarRental.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and
              disclose information that results from your use of our web pages. Please read it here:{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
              the terms then you may not access the Service.
            </p>

            <h2>2. Rental Agreement</h2>
            <p>
              When you rent a vehicle from us, you are entering into a rental agreement that is governed by these Terms
              and Conditions as well as the specific terms outlined in your rental contract.
            </p>
            <p>
              The rental agreement is between you (the "Renter") and CarRental (the "Company"). By signing the rental
              contract or accepting the keys to the vehicle, you acknowledge that you have read, understood, and agree
              to be bound by all terms and conditions.
            </p>

            <h2>3. Eligibility Requirements</h2>
            <h3>3.1 Age Requirements</h3>
            <p>
              The minimum age to rent a vehicle is 21 years old. Drivers under 25 years of age may be subject to a Young
              Driver Surcharge and may be restricted from renting certain vehicle classes.
            </p>

            <h3>3.2 Driver's License</h3>
            <p>
              All drivers must possess a valid driver's license that has been held for at least one year. International
              customers must have a valid driver's license from their country of residence, and in some cases, an
              International Driving Permit may be required.
            </p>

            <h3>3.3 Credit Card</h3>
            <p>
              A valid credit card in the primary renter's name is required for all rentals. The credit card will be used
              for the security deposit and any additional charges that may arise during the rental period.
            </p>

            <h2>4. Reservation and Cancellation</h2>
            <h3>4.1 Reservations</h3>
            <p>
              Reservations can be made online, by phone, or in person at any of our rental locations. A reservation
              guarantees the availability of a vehicle in the selected category, but not a specific make or model.
            </p>

            <h3>4.2 Cancellations</h3>
            <p>
              For pay-later reservations, cancellations can be made at any time without penalty. For prepaid
              reservations, cancellations made less than 24 hours before the scheduled pickup time may incur a
              cancellation fee of one day's rental charge.
            </p>

            <h3>4.3 No-Shows</h3>
            <p>
              If you fail to pick up your vehicle at the scheduled time without prior notification, your reservation may
              be canceled, and for prepaid reservations, a no-show fee equivalent to one day's rental charge may be
              applied.
            </p>

            <h2>5. Vehicle Pickup and Return</h2>
            <h3>5.1 Pickup Procedure</h3>
            <p>
              At the time of pickup, you must present a valid driver's license, credit card, and any other required
              documentation. You will be required to sign the rental agreement and complete a vehicle inspection with
              our staff.
            </p>

            <h3>5.2 Return Procedure</h3>
            <p>
              The vehicle must be returned to the agreed location on the date and time specified in the rental
              agreement. The vehicle should be returned in the same condition as it was received, except for normal wear
              and tear.
            </p>

            <h3>5.3 Late Returns</h3>
            <p>
              Late returns may result in additional charges. A grace period of 29 minutes is typically provided, after
              which an additional day's rental charge may be applied.
            </p>

            <h3>5.4 After-Hours Return</h3>
            <p>
              If you need to return the vehicle outside of business hours, please follow the after-hours return
              procedure provided at the rental location. You will remain responsible for the vehicle until it is checked
              in by our staff during the next business day.
            </p>

            <h2>6. Fees and Charges</h2>
            <h3>6.1 Rental Charges</h3>
            <p>
              The base rental rate includes the daily or weekly charge for the vehicle rental. Additional charges may
              apply for optional services, equipment, or insurance coverage.
            </p>

            <h3>6.2 Security Deposit</h3>
            <p>
              A security deposit will be authorized on your credit card at the time of pickup. The amount varies
              depending on the vehicle type and rental location. This deposit will be released upon the vehicle's
              return, provided there are no additional charges.
            </p>

            <h3>6.3 Additional Charges</h3>
            <p>Additional charges may include, but are not limited to:</p>
            <ul>
              <li>Fuel charges if the vehicle is not returned with the same fuel level as at pickup</li>
              <li>Cleaning fees for excessive dirt or odors, including smoking</li>
              <li>Traffic or parking violations incurred during the rental period</li>
              <li>Toll fees not paid during the rental period</li>
              <li>Damage repair costs not covered by insurance</li>
              <li>Lost key replacement fees</li>
              <li>Early or late return fees</li>
            </ul>

            <h2>7. Fuel Policy</h2>
            <p>
              Our standard fuel policy is "full-to-full." This means you will receive the vehicle with a full tank of
              fuel and are expected to return it with a full tank. If the vehicle is returned with less fuel than at
              pickup, you will be charged for the missing fuel plus a refueling service fee.
            </p>
            <p>
              We also offer a prepaid fuel option where you can purchase a full tank of fuel at the beginning of your
              rental and return the vehicle with any amount of fuel without incurring additional charges.
            </p>

            <h2>8. Insurance and Liability</h2>
            <h3>8.1 Basic Insurance</h3>
            <p>
              All rentals include basic liability insurance as required by law. This coverage may vary by location and
              is subject to the terms, conditions, limitations, and exclusions of the policy.
            </p>

            <h3>8.2 Optional Coverage</h3>
            <p>We offer additional insurance options for purchase, including:</p>
            <ul>
              <li>Collision Damage Waiver (CDW)</li>
              <li>Supplemental Liability Insurance (SLI)</li>
              <li>Personal Accident Insurance (PAI)</li>
              <li>Personal Effects Coverage (PEC)</li>
            </ul>
            <p>These optional coverages are subject to their own terms, conditions, limitations, and exclusions.</p>

            <h3>8.3 Renter's Liability</h3>
            <p>
              You are responsible for all damage to the vehicle during the rental period, regardless of fault, unless
              covered by an applicable insurance policy. You are also responsible for any loss of use, diminished value,
              and administrative fees associated with damage to the vehicle.
            </p>

            <h2>9. Vehicle Use Restrictions</h2>
            <p>The rental vehicle may not be used:</p>
            <ul>
              <li>By anyone not listed as an authorized driver on the rental agreement</li>
              <li>While under the influence of alcohol, drugs, or any other substance that impairs driving ability</li>
              <li>For any illegal purpose or in any illegal manner</li>
              <li>To push or tow any vehicle or other object</li>
              <li>In any race, test, or competition</li>
              <li>Off paved roads or on roads unsuitable for the vehicle</li>
              <li>To transport persons or property for hire (e.g., as a taxi or delivery service)</li>
              <li>To transport hazardous materials or substances</li>
              <li>Outside the authorized geographic area specified in the rental agreement</li>
            </ul>
            <p>
              Violation of these restrictions may result in the loss of insurance coverage, liability for all damages,
              and potential termination of the rental agreement.
            </p>

            <h2>10. Maintenance and Breakdowns</h2>
            <p>
              You are responsible for reporting any mechanical issues with the vehicle as soon as they are noticed.
              Regular maintenance, such as checking oil and tire pressure, is your responsibility during the rental
              period.
            </p>
            <p>
              In case of a breakdown, please contact our 24/7 roadside assistance service. Unauthorized repairs will not
              be reimbursed without prior approval.
            </p>

            <h2>11. Accidents and Theft</h2>
            <p>In the event of an accident or theft, you must:</p>
            <ol>
              <li>Report the incident to the police immediately</li>
              <li>Contact our emergency number as soon as possible</li>
              <li>Complete an accident/incident report</li>
              <li>Obtain names and contact information of all parties involved and witnesses</li>
              <li>Not admit fault or liability</li>
            </ol>
            <p>
              Failure to follow these procedures may result in the loss of insurance coverage and liability for all
              damages.
            </p>

            <h2>12. Privacy Policy</h2>
            <p>
              We collect and process personal information in accordance with our Privacy Policy. By using our services,
              you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
            </p>

            <h2>13. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting
              on our website. Your continued use of our services after any changes indicates your acceptance of the
              modified Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the state/province/country
              in which the rental agreement is executed, without regard to its conflict of law provisions.
            </p>

            <h2>15. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li>By email: legal@carrental.com</li>
              <li>By phone: +1 (123) 456-7890</li>
              <li>By mail: 123 Rental Street, Automotive City, AC 12345</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Have questions about our terms?</span>
            <span className="block text-blue-600">Our support team is here to help.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsPage
