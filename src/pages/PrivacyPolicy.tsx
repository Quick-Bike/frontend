import React, { useState } from "react";
import {
  IoChevronDown,
  IoChevronForward,
  IoShield,
  IoPersonAdd,
  IoLockClosed,
  IoDocumentText,
  IoOpenOutline,
  IoPerson,
  IoRefresh,
  IoMail,
  IoInformationCircle,
  IoEye,
  IoCard,
  IoLocationSharp,
  IoCall,
} from "react-icons/io5";

interface ExpandedSections {
  [key: string]: boolean;
}

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: "orange" | "blue" | "green" | "purple" | "red" | "indigo";
}

const PrivacyPolicy: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [activeSection, setActiveSection] = useState<string>("");

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  type ColorKeys = "orange" | "blue" | "green" | "purple" | "red" | "indigo";

  interface SectionCardProps {
    id: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    children: React.ReactNode;
    color?: ColorKeys;
  }

  const SectionCard: React.FC<SectionCardProps> = ({
    id,
    title,
    icon: Icon,
    children,
    color = "orange",
  }) => {
    const isExpanded = expandedSections[id] || false;

    const colorClasses: Record<ColorKeys, string> = {
      orange: "bg-orange-50 border-orange-200 hover:border-orange-300",
      blue: "bg-blue-50 border-blue-200 hover:border-blue-300",
      green: "bg-green-50 border-green-200 hover:border-green-300",
      purple: "bg-purple-50 border-purple-200 hover:border-purple-300",
      red: "bg-red-50 border-red-200 hover:border-red-300",
      indigo: "bg-indigo-50 border-indigo-200 hover:border-indigo-300",
    };

    const iconColors: Record<ColorKeys, string> = {
      orange: "text-orange-600",
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      red: "text-red-600",
      indigo: "text-indigo-600",
    };

    return (
      <div
        id={id}
        className={`mb-6 bg-white rounded-lg border-2 ${colorClasses[color]} transition-all duration-300 shadow-sm hover:shadow-md`}
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-t-lg transition-colors duration-200"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-full bg-white border-2 ${iconColors[color]}`}
            >
              <Icon size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {isExpanded ? "Hide" : "Show"} Details
            </span>
            {isExpanded ? (
              <IoChevronDown size={20} />
            ) : (
              <IoChevronForward size={20} />
            )}
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-0 border-t border-gray-100">{children}</div>
        </div>
      </div>
    );
  };

  interface InfoCardProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
  }

  const InfoCard: React.FC<InfoCardProps> = ({
    icon: Icon,
    title,
    description,
  }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <Icon size={20} className="text-orange-600 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  const sections: SectionConfig[] = [
    {
      id: "information-collect",
      title: "Information We Collect",
      icon: IoInformationCircle,
      color: "orange",
    },
    {
      id: "how-use",
      title: "How We Use Your Information",
      icon: IoPersonAdd,
      color: "blue",
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: IoLockClosed,
      color: "green",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: IoShield,
      color: "purple",
    },
    {
      id: "third-party",
      title: "Third-Party Links",
      icon: IoOpenOutline,
      color: "indigo",
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: IoPerson,
      color: "red",
    },
    {
      id: "changes to",
      title: "Changes to this  Policy",
      icon: IoRefresh,
      color: "orange",
    },
    { id: "contact", title: "Contact Us", icon: IoMail, color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <IoShield size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-orange-100 mb-6">
            Your privacy is important to us. Learn how we collect, use, and
            protect your data.
          </p>
          <div className="bg-white bg-opacity-100 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-black">
              <strong>Last Updated:</strong> April 1, 2024 |
              <strong className="ml-2">Effective Date:</strong> April 1, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeSection === section.id
                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick Summary */}
        <div className="mb-12 bg-white rounded-xl p-8 shadow-md border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Privacy at a Glance
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              icon={IoEye}
              title="What We Collect"
              description="Personal details, payment info, ride history, and device data to provide our services."
            />
            <InfoCard
              icon={IoShield}
              title="How We Protect"
              description="Industry-standard encryption and security measures to keep your data safe."
            />
            <InfoCard
              icon={IoPersonAdd}
              title="Your Control"
              description="Access, update, or delete your data anytime. You have full control over your privacy."
            />
            <InfoCard
              icon={IoDocumentText}
              title="Transparency"
              description="Clear explanations of our practices with no hidden clauses or complicated language."
            />
          </div>
        </div>

        {/* Expandable Sections */}
        <SectionCard
          id="information-collect"
          title="Information We Collect"
          icon={IoInformationCircle}
          color="orange"
        >
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We collect information to provide you with the best bike and
              scooter rental experience. Here's what we gather:
            </p>

            <div className="grid gap-4">
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <IoPersonAdd size={20} className="text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Personal Information
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Name, email address, phone number, and other contact details
                    you provide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <IoCard size={20} className="text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Payment Information
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Credit/debit card information, billing address, and
                    transaction details when you make a payment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <IoLocationSharp size={20} className="text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Ride Information
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Ride history, rental dates/times, pickup/drop-off locations,
                    and vehicle preference.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <IoDocumentText size={20} className="text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Technical Information
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    IP address, browser type, device information, and cookies
                    usage data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="how-use"
          title="How We Use Your Information"
          icon={IoPersonAdd}
          color="blue"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed mb-6">
              We use your information to provide, improve, and secure our
              bike/scooter rental services:
            </p>

            <div className="space-y-3">
              {[
                "To provide, operate, and improve our bike/scooter rental services.",
                "To process and secure your payments and rentals.",
                "To communicate booking confirmations, updates, and customer support information.",
                "To send promotional offers or newsletters if you opt in.",
                "To comply with legal and regulatory requirements.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="data-security"
          title="Data Security"
          icon={IoLockClosed}
          color="green"
        >
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <IoLockClosed size={24} className="text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">
                  Your Data is Protected
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures, such as
                SSL/TLS encryption and firewalls, to protect your data. Access
                to your personal information is restricted to authorized
                personnel only.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> No internet transmission or
                electronic storage method is completely secure, so we cannot
                guarantee absolute protection.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="your-rights"
          title="Your Rights"
          icon={IoShield}
          color="purple"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed mb-6">
              You have several rights regarding your personal data. Here's what
              you can do:
            </p>

            <div className="grid gap-4">
              {[
                "You have the right to access the personal data we hold about you.",
                "You may request correction or update of your data if it is inaccurate or incomplete.",
                "You can request deletion of your personal data, subject to legal obligations.",
                "You may restrict or object to certain data processing, or withdraw consent at any time.",
                "You have the right to data portability (obtaining a copy of your data in a common format).",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg"
                >
                  <IoShield
                    size={20}
                    className="text-purple-600 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>To exercise any of these rights,</strong> please contact
                us using the information below. We will respond to your request
                in accordance with applicable law.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="third-party"
          title="Third-Party Links"
          icon={IoOpenOutline}
          color="indigo"
        >
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party sites (for example,
              map or payment services). These sites have their own privacy
              policies, and we are not responsible for their practices. We
              encourage you to review their policies when you visit them.
            </p>
          </div>
        </SectionCard>

        <SectionCard
          id="children"
          title="Children's Privacy"
          icon={IoPerson}
          color="red"
        >
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <IoPerson size={24} className="text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">
                Age Restriction: 18+
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to children under 18. We do not
              knowingly collect personal data from minors under 18 years. If we
              learn that we have collected information from a child under 18, we
              will promptly delete it. Parents or guardians should contact us if
              they believe we have any information about a child.
            </p>
          </div>
        </SectionCard>

        <SectionCard
          id="changes to"
          title="Changes to this Policy"
          icon={IoRefresh}
          color="orange"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do,
              we will revise the "Last Updated" date above. We encourage you to
              review this page periodically.
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> Continued use of our service after
                changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="contact" title="Contact Us" icon={IoMail} color="blue">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions, concerns, or requests regarding your
              privacy, please contact us:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <IoLocationSharp
                  size={32}
                  className="text-blue-600 mx-auto mb-3"
                />
                <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                <p className="text-sm text-gray-600">
                  Near Kamal Barat Ghar,
                  <br />
                  Joshi Sweets, Pithoragarh,
                  <br />
                  Uttarakhand, 262501
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <IoMail size={32} className="text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                <p className="text-sm text-gray-600">privacy@bikerentals.com</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <IoCall size={32} className="text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                <p className="text-sm text-gray-600">+91 75360 18155</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-300">
            © 2024 Bike Rentals. This privacy policy is designed to be
            transparent and easy to understand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
