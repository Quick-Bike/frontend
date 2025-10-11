import {
  FiChevronRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiInfo,
  FiUser,
  FiCreditCard,
  FiXCircle,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiTool,
  FiSlash,
  FiShield,
  FiRefreshCw,
  FiFileText,
  FiList,
  FiHeadphones,
} from "react-icons/fi";
import { FaMotorcycle } from "react-icons/fa";

const sections = [
  { id: "introduction", title: "1. Introduction", icon: <FiInfo /> },
  { id: "eligibility", title: "2. Eligibility", icon: <FiUser /> },
  { id: "vehicles", title: "3. Vehicles We Rent", icon: <FaMotorcycle /> },
  {
    id: "booking-payment",
    title: "4. Booking, Payment & Security Deposit",
    icon: <FiCreditCard />,
  },
  {
    id: "cancellations",
    title: "5. Cancellations & Refunds",
    icon: <FiXCircle />,
  },
  {
    id: "pickup-inspection",
    title: "6. Vehicle Pickup & Inspection",
    icon: <FiCheckCircle />,
  },
  {
    id: "use-prohibited",
    title: "7. Use of Vehicle & Prohibited Activities",
    icon: <FiAlertTriangle />,
  },
  {
    id: "late-returns",
    title: "8. Late Returns & Additional Charges",
    icon: <FiClock />,
  },
  {
    id: "damage-insurance",
    title: "9. Damage, Loss & Insurance",
    icon: <FiTool />,
  },
  { id: "fuel-policy", title: "10. Fuel Policy", icon: <FiSlash /> },
  {
    id: "fines",
    title: "11. Fines, Tolls & Traffic Violations",
    icon: <FiShield />,
  },
  {
    id: "termination",
    title: "12. Termination & Suspension",
    icon: <FiXCircle />,
  },
  {
    id: "liability",
    title: "13. Limitation of Liability",
    icon: <FiFileText />,
  },
  { id: "changes", title: "14. Changes to Terms", icon: <FiRefreshCw /> },
  { id: "governing-law", title: "15. Governing Law", icon: <FiFileText /> },
  {
    id: "checklist",
    title: "16. Consumer Checklist (Before You Ride)",
    icon: <FiList />,
  },
  {
    id: "contact-support",
    title: "17. Contact & Support",
    icon: <FiHeadphones />,
  },
];

export default function TermsAndConditions() {
  const boxClass = `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 mb-8 transition-colors duration-500`;
  const headingClass =
    "text-3xl font-extrabold text-orange-500 dark:text-yellow-500 dark:hover:text-yellow-600 border-l-4 border-orange-500 pl-4 mb-6 drop-shadow-md";
  const customListClass = "list-none pl-0";

  // IconList defined inside main component to access customListClass
  type IconListProps = {
    items: string[];
  };
  const IconList: React.FC<IconListProps> = ({ items }) => (
    <ul className={customListClass}>
      {items.map((text, i) => (
        <li key={i} className="flex items-start mb-2">
          <FiCheckCircle className="flex-shrink-0 mt-1 text-orange-500 mr-3" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <main
      className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-800
      min-h-screen py-12 transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-4xl font-extrabold text-orange-500 dark:text-yellow-500 dark:hover:text-yellow-600 mb-4 sm:mb-0 tracking-tight drop-shadow-md">
            Terms &amp; Conditions
          </h1>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex items-center px-4 py-2 border border-orange-500 rounded-md text-orange-500 hover:bg-orange-500 hover:text-white transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
        </header>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          <strong>Last Updated:</strong> April 1, 2025
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Table of Contents */}
          <nav className="hidden lg:block w-64 sticky top-24 self-start bg-orange-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-yellow-600 cursor-pointer mb-6">
              Contents
            </h2>
            <ul className="space-y-3">
              {sections.map(({ id, title, icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex items-center dark:text-yellow-500 dark:hover:text-yellow-600 text-orange-500 hover:text-orange-800 transition"
                  >
                    <span className="mr-2 text-lg">{icon}</span>
                    {title}
                    <FiChevronRight className="ml-auto" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-orange dark:prose-invert max-w-none flex-1">
            {/* 1. Introduction */}
            <section id="introduction" className={boxClass}>
              <h2 className={headingClass}>1. Introduction</h2>
              <p>
                Welcome to{" "}
                <span className="font-medium">[Your Company Name]</span>. These
                Terms &amp; Conditions govern your use of our bike and scooty
                rental services. By making a booking or taking possession of a
                vehicle, you agree to comply with these terms. If you do not
                agree, please do not proceed with the rental.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility" className={boxClass}>
              <h2 className={headingClass}>2. Eligibility</h2>
              <IconList
                items={[
                  "Renter must be at least 18 years old.",
                  "A valid two-wheeler Driving License (original) and a government ID (Aadhaar preferred) are required at booking and pickup. Learner licenses are not accepted.",
                  "The person who makes the booking and presents the required documents is the only authorized rider unless otherwise agreed in writing.",
                ]}
              />
            </section>

            {/* 3. Vehicles We Rent */}
            <section id="vehicles" className={boxClass}>
              <h2 className={headingClass}>3. Vehicles We Rent</h2>
              <p>
                We offer <strong>Motorbikes</strong> and{" "}
                <strong>Scooties</strong> for rental. Vehicle models, features
                and availability are shown on the booking confirmation; please
                review those details before pickup.
              </p>
            </section>

            {/* 4. Booking, Payment & Security Deposit */}
            <section id="booking-payment" className={boxClass}>
              <h2 className={headingClass}>
                4. Booking, Payment &amp; Security Deposit
              </h2>
              <IconList
                items={[
                  "Advance payment: The rental fee must be paid in full at booking or at pickup as specified on the booking page.",
                  "Security deposit: A refundable deposit is collected to cover damages, missing accessories, fines or other breaches. It may be taken as a card hold, cash, or bank transfer depending on the pickup location.",
                  "Refund timing: The deposit will be refunded in full if the vehicle is returned in acceptable condition. Refunds are processed to the original payment method and typically take 3–7 business days.",
                  "Keep all payment receipts and confirmation emails until the rental and refund process are complete.",
                ]}
              />
            </section>

            <section id="cancellations" className={boxClass}>
              <h2 className={headingClass}>5. Cancellations &amp; Refunds</h2>
              <IconList
                items={[
                  "If you cancel a confirmed booking you will receive a refund equal to 75%of the rental fee. The security deposit will always be refunded in full provided the vehicle is not taken and no charges are outstanding.",
                  "Refunds are returned to the original payment source and may take several business days to appear. If you do not collect the vehicle at the scheduled time (no-show) without informing us, you may forfeit the rental fee.",
                  "If we cancel the booking for reasons such as vehicle unavailability or safety concerns, you will receive a full refund of the rental fee and deposit.",
                ]}
              />
            </section>

            {/* 6. Vehicle Pickup & Inspection */}
            <section id="pickup-inspection" className={boxClass}>
              <h2 className={headingClass}>
                6. Vehicle Pickup &amp; Inspection
              </h2>
              <IconList
                items={[
                  "Inspect the vehicle at pickup for any visible damage (scratches, dents, tire and light condition) and ensure accessories are present.",
                  "Report any pre-existing damage on the rental form before you leave; failing to report may result in charges on return.",
                  "Helmets and basic safety items (if included) must be returned in the same condition; you are responsible for loss or damage to accessories supplied to you.",
                ]}
              />
            </section>

            {/* 7. Use of Vehicle & Prohibited Activities */}
            <section id="use-prohibited" className={boxClass}>
              <h2 className={headingClass}>
                7. Use of Vehicle &amp; Prohibited Activities
              </h2>
              <p className="mb-3">
                You agree to use the vehicle responsibly. The following
                activities are strictly prohibited:
              </p>
              <IconList
                items={[
                  "Racing, stunt riding, or any reckless driving.",
                  "Carrying more passengers than the vehicle is designed for.",
                  "Transporting goods for commercial purposes unless explicitly authorized.",
                  "Riding under the influence of alcohol, drugs, or any substance that impairs ability.",
                  "Using the vehicle for any illegal purpose.",
                  "Riding without a helmet by either the rider or pillion rider ",
                ]}
              />
            </section>

            {/* 8. Late Returns & Additional Charges */}
            <section id="late-returns" className={boxClass}>
              <h2 className={headingClass}>
                8. Late Returns &amp; Additional Charges
              </h2>
              <IconList
                items={[
                  "Return the vehicle at the agreed time. A short grace period may apply depending on location and bookings. Late returns will incur additional charges that may be billed at an hourly rate or as an extra rental day — the specific rate will be shown on your booking confirmation or explained at pickup.",

                  "Failure to return the vehicle without contacting us may lead to the vehicle being reported as missing and additional recovery or theft charges applied to you.",
                ]}
              />
            </section>

            {/* 9. Damage, Loss & Insurance */}
            <section id="damage-insurance" className={boxClass}>
              <h2 className={headingClass}>9. Damage, Loss &amp; Insurance</h2>
              <IconList
                items={[
                  "You are responsible for any damage, loss or theft that occurs while the vehicle is in your possession.",
                  "Repair or replacement costs, including loss of use while the vehicle is being fixed, will be charged to you. We will provide estimates and receipts for any work done.",
                  "In case of an accident, prioritize safety and the well-being of people involved. Contact emergency services if needed, inform us immediately, take photos, and file a police report where applicable.",
                  "If insurance is included or offered, we will explain coverage, limits and deductibles at pickup. Insurance may not cover negligence, intoxicated riding, or unauthorized use.",
                ]}
              />
            </section>

            {/* 10. Fuel Policy */}
            <section id="fuel-policy" className={boxClass}>
              <h2 className={headingClass}>10. Fuel Policy</h2>
              <IconList
                items={[
                  "Vehicles are provided with minimal fuel sufficient to reach the nearest petrol station. You are responsible for refueling during your rental. If the vehicle is returned  less fuel than agreed, fuel charges plus a service fee may apply.",
                  "Unused fuel is non-refundable.",
                ]}
              />
            </section>

            {/* 11. Fines, Tolls & Traffic Violations */}
            <section id="fines" className={boxClass}>
              <h2 className={headingClass}>
                11. Fines, Tolls &amp; Traffic Violations
              </h2>
              <p>
                You are responsible for all fines, tolls, penalties and legal
                costs incurred during the rental. If any authority contacts us
                about violations, we will notify you and charge your account for
                the unpaid amounts plus an administrative fee.
              </p>
            </section>

            {/* 12. Termination & Suspension */}
            <section id="termination" className={boxClass}>
              <h2 className={headingClass}>12. Termination &amp; Suspension</h2>
              <p>
                We may suspend or terminate your rental without refund if you
                breach these terms, including driving under the influence,
                reckless use, or illegal activity. You must return the vehicle
                immediately upon request.
              </p>
            </section>

            {/* 13. Limitation of Liability */}
            <section id="liability" className={boxClass}>
              <h2 className={headingClass}>13. Limitation of Liability</h2>
              <IconList
                items={[
                  "To the fullest extent permitted by law, we are not liable for personal injury, loss of property, or indirect or consequential damages arising from your use of the vehicle. You accept responsibility for obeying traffic laws and riding safely.",
                  "Our liability for direct loss due to our negligence is limited to the amounts paid for the relevant rental period, except where local law requires otherwise.",
                ]}
              />
            </section>

            {/* 14. Changes to Terms */}
            <section id="changes" className={boxClass}>
              <h2 className={headingClass}>14. Changes to Terms</h2>
              <p>
                We may update these Terms &amp; Conditions occasionally. Updated
                versions will be posted on our website with a new "Last Updated"
                date. Continued use of our service after changes indicates
                acceptance of the revised terms.
              </p>
            </section>

            {/* 15. Governing Law */}
            <section id="governing-law" className={boxClass}>
              <h2 className={headingClass}>15. Governing Law</h2>
              <p>
                These Terms are governed by the laws of <strong>India</strong>.
                Any disputes will be subject to the jurisdiction of the courts
                in <strong>[Pithoragarh, Uttarakhand]</strong>.
              </p>
            </section>

            {/* 16. Consumer Checklist */}
            <section id="checklist" className={boxClass}>
              <h2 className={headingClass}>
                16. Consumer Checklist (Before You Ride)
              </h2>
              {/* <ol className="list-decimal list-inside text-gray-700 space-y-2 dark:text-gray-300">
                                <li>Verify your booking confirmation and vehicle model.</li>
                                <li>Bring original Driving License and Aadhaar (or accepted alternative ID).</li>
                                <li>Inspect the vehicle and take photos and videos of any existing damage.</li>
                                <li>Confirm fuel level and return requirements.</li>
                                <li>Ask about late fees, emergency contact numbers and insurance coverage.</li>
                            </ol> */}
              <IconList
                items={[
                  "Verify your booking confirmation and vehicle model.",
                  "Bring original Driving License and Aadhaar (or accepted alternative ID).",
                  "Inspect the vehicle and take photos and videos of any existing damage.",
                  "Confirm fuel level and return requirements.",
                  "Ask about late fees, emergency contact numbers and insurance coverage.",
                ]}
              />
            </section>

            {/* 17. Contact & Support */}
            <section id="contact-support" className={boxClass}>
              <h2 className={headingClass}>17. Contact &amp; Support</h2>
              <p className="mb-3">
                If you have questions or need assistance, contact us:
              </p>
              <ul className="list-none pl-0 space-y-3">
                <li className="flex items-center gap-2">
                  <FiPhone className="text-orange-500" />
                  <a
                    href="tel:+911234567890"
                    className="text-orange-500 hover:underline"
                  >
                    +91 7536018155
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="text-orange-500" />
                  <a
                    href="mailto:support@yourrental.com"
                    className="text-orange-500 hover:underline"
                  >
                    support@yourrental.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="text-orange-500" />
                  <span>
                    Near Kamal Barat Ghar ,Joshi Sweets, Pithoragarh,
                    Uttarakhand, 262501
                  </span>
                </li>
              </ul>
            </section>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thank you for choosing [Your Company Name]. Ride safe!
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
