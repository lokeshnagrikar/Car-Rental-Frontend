import MainLayout from "../layouts/MainLayout"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"

const PrivacyPolicyPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Privacy Policy</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">How we collect, use, and protect your personal information</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue mx-auto">
            <p className="text-gray-500">Last updated: May 14, 2023</p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8 flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-blue-800 mb-2">Your Privacy Matters</h3>
                <p className="text-blue-700 text-sm mb-0">
                  At CarRental, we are committed to protecting your privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our services.
                </p>
              </div>
            </div>

            <h2>1. Introduction</h2>
            <p>
              CarRental ("we", "our", or "us") respects your privacy and is committed to protecting it through our
              compliance with this policy. This Privacy Policy describes the types of information we may collect from
              you or that you may provide when you visit our website, use our mobile application, or utilize our car
              rental services, and our practices for collecting, using, maintaining, protecting, and disclosing that
              information.
            </p>
            <p>
              Please read this policy carefully to understand our policies and practices regarding your information and
              how we will treat it. If you do not agree with our policies and practices, your choice is not to use our
              services. By accessing or using our services, you agree to this Privacy Policy.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our services, including:</p>

            <h3>2.1 Personal Information</h3>
            <p>
              Personal information is data that can be used to identify you individually. We collect the following
              categories of personal information:
            </p>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, email address, postal address, telephone number
              </li>
              <li>
                <strong>Identification Information:</strong> Driver's license number, passport number, date of birth
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details, billing address
              </li>
              <li>
                <strong>Driving Record:</strong> Driving history, accident reports (where legally permitted)
              </li>
              <li>
                <strong>Account Information:</strong> Username, password, account preferences
              </li>
            </ul>

            <h3>2.2 Non-Personal Information</h3>
            <p>We also collect non-personal information that does not directly identify you, including:</p>
            <ul>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, mobile app, and services
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers
              </li>
              <li>
                <strong>Location Data:</strong> Geographic location of the rental vehicle (for fleet management
                purposes)
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons,
                and other tracking technologies
              </li>
            </ul>

            <h2>3. How We Collect Information</h2>
            <p>We collect information in the following ways:</p>

            <h3>3.1 Direct Collection</h3>
            <p>Information you provide to us directly when you:</p>
            <ul>
              <li>Create an account or profile</li>
              <li>Make a reservation or rent a vehicle</li>
              <li>Contact our customer service</li>
              <li>Complete surveys or provide feedback</li>
              <li>Participate in promotions or loyalty programs</li>
            </ul>

            <h3>3.2 Automated Collection</h3>
            <p>Information collected automatically when you use our services:</p>
            <ul>
              <li>Through cookies and similar tracking technologies</li>
              <li>Through our mobile applications</li>
              <li>Through vehicle telematics systems (in equipped vehicles)</li>
              <li>Through server logs and analytics tools</li>
            </ul>

            <h3>3.3 Third-Party Sources</h3>
            <p>Information we receive from third parties:</p>
            <ul>
              <li>Business partners and service providers</li>
              <li>Credit reporting agencies (for verification purposes)</li>
              <li>Marketing partners and advertisers</li>
              <li>Social media platforms (if you connect your account)</li>
            </ul>

            <h2>4. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>

            <h3>4.1 Providing and Improving Our Services</h3>
            <ul>
              <li>Processing and managing your reservations and rentals</li>
              <li>Verifying your identity and eligibility to rent vehicles</li>
              <li>Processing payments and managing billing</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Improving and personalizing our services</li>
              <li>Developing new features and offerings</li>
            </ul>

            <h3>4.2 Communication</h3>
            <ul>
              <li>Sending transactional messages about your rentals</li>
              <li>Providing important updates about our services</li>
              <li>Sending marketing communications (with your consent where required)</li>
              <li>Conducting surveys and collecting feedback</li>
            </ul>

            <h3>4.3 Security and Compliance</h3>
            <ul>
              <li>Protecting our assets and preventing fraud</li>
              <li>Monitoring and enforcing compliance with our terms and policies</li>
              <li>Meeting legal obligations and responding to legal requests</li>
              <li>Resolving disputes and troubleshooting problems</li>
            </ul>

            <h2>5. Sharing Your Information</h2>
            <p>We may share your information with the following categories of recipients:</p>

            <h3>5.1 Service Providers</h3>
            <p>We share information with third-party service providers who perform services on our behalf, such as:</p>
            <ul>
              <li>Payment processors and financial institutions</li>
              <li>Customer support and communication platforms</li>
              <li>Cloud storage and hosting providers</li>
              <li>Analytics and data processing companies</li>
              <li>Marketing and advertising partners</li>
            </ul>

            <h3>5.2 Business Partners</h3>
            <p>We may share information with business partners, such as:</p>
            <ul>
              <li>Travel agencies and booking platforms</li>
              <li>Insurance providers</li>
              <li>Roadside assistance services</li>
              <li>Loyalty program partners</li>
            </ul>

            <h3>5.3 Legal and Regulatory Entities</h3>
            <p>We may disclose information when legally required:</p>
            <ul>
              <li>In response to court orders, subpoenas, or legal process</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with an investigation of suspected or actual illegal activity</li>
            </ul>

            <h3>5.4 Corporate Transactions</h3>
            <p>
              In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be
              transferred to the acquiring entity.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure network infrastructure</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your personal information, we cannot guarantee its
              absolute security.
            </p>

            <h2>7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>

            <h3>7.1 Access and Portability</h3>
            <p>
              You may request access to the personal information we hold about you and, in some cases, receive it in a
              structured, commonly used, and machine-readable format.
            </p>

            <h3>7.2 Correction</h3>
            <p>You may request that we correct inaccurate or incomplete personal information we hold about you.</p>

            <h3>7.3 Deletion</h3>
            <p>
              You may request that we delete your personal information in certain circumstances, subject to legal
              retention requirements.
            </p>

            <h3>7.4 Restriction and Objection</h3>
            <p>
              You may request that we restrict the processing of your personal information or object to certain
              processing activities.
            </p>

            <h3>7.5 Withdrawal of Consent</h3>
            <p>
              Where we rely on your consent to process your personal information, you have the right to withdraw that
              consent at any time.
            </p>

            <h3>7.6 Exercising Your Rights</h3>
            <p>
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section below. We may need to verify your identity before fulfilling your request.
            </p>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and
              to distinguish you from other users of our website and mobile applications. These technologies help us
              provide you with a better experience and enable certain features and functionalities.
            </p>
            <p>
              You can control cookies through your browser settings and other tools. However, if you block certain
              cookies, you may not be able to use all the features of our services.
            </p>
            <p>
              For more detailed information about the cookies we use and how to manage them, please see our{" "}
              <a href="/cookie-policy" className="text-blue-600 hover:text-blue-500">
                Cookie Policy
              </a>
              .
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under the age of 18, and we do not knowingly collect personal
              information from children under 18. If we learn that we have collected personal information from a child
              under 18, we will take steps to delete that information as quickly as possible.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              We operate globally and may transfer your personal information to countries other than your country of
              residence. These countries may have different data protection laws than your country. When we transfer
              your information internationally, we implement appropriate safeguards to ensure that your information
              remains protected in accordance with this Privacy Policy and applicable law.
            </p>

            <h2>11. Retention of Information</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes for which we
              collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the
              personal information, the potential risk of harm from unauthorized use or disclosure, and applicable legal
              requirements.
            </p>

            <h2>12. Changes to Our Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. If we make material changes, we will notify you by email or
              through a notice on our website prior to the changes becoming effective. We encourage you to review this
              Privacy Policy periodically.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
              please contact us at:
            </p>
            <ul>
              <li>
                <strong>Email:</strong> privacy@carrental.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (123) 456-7890
              </li>
              <li>
                <strong>Mail:</strong> Privacy Officer, CarRental, 123 Rental Street, Automotive City, AC 12345
              </li>
            </ul>
            <p>
              We will respond to your request within a reasonable timeframe and in accordance with applicable data
              protection laws.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              This Privacy Policy shall be governed by and construed in accordance with the laws of the
              state/province/country in which our principal place of business is located, without regard to its conflict
              of law provisions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Have questions about your privacy?</span>
            <span className="block text-blue-600">Our privacy team is here to help.</span>
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
    </MainLayout>
  )
}

export default PrivacyPolicyPage
