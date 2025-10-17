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
      orange:
        "bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600",
      blue: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600",
      green:
        "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600",
      purple:
        "bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600",
      red: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600",
      indigo:
        "bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600",
    };

    const iconColors: Record<ColorKeys, string> = {
      orange: "text-orange-600 dark:text-orange-400",
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      purple: "text-purple-600 dark:text-purple-400",
      red: "text-red-600 dark:text-red-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
    };

    return (
      <div
        id={id}
        className={`mb-6 rounded-lg border-2 ${colorClasses[color]} transition-all duration-300 shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg`}
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg transition-colors duration-200"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-full bg-white dark:bg-gray-900 border-2 ${iconColors[color]}`}
            >
              <Icon size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isExpanded ? "Hide" : "Show"} Details
            </span>
            {isExpanded ? (
              <IoChevronDown
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
            ) : (
              <IoChevronForward
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
            )}
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
            {children}
          </div>
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
    <div className="flex items-start space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
      <Icon
        size={20}
        className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0"
      />
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
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
      title: "Changes to this Policy",
      icon: IoRefresh,
      color: "orange",
    },
    { id: "contact", title: "Contact Us", icon: IoMail, color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-700 dark:to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <IoShield size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-orange-100">
            Your privacy is important to us. Learn how we collect, use, and
            protect your data.
          </p>
          <div className="bg-white bg-opacity-100 dark:bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto mt-6">
            <p className="text-sm text-black dark:text-gray-300">
              <strong>Last Updated:</strong> April 1, 2024 |{" "}
              <strong className="ml-2">Effective Date:</strong> April 1, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeSection === section.id
                    ? "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900 dark:text-orange-400 dark:border-orange-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-orange-100 dark:border-orange-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
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
        {sections.map((sec) => (
          <SectionCard
            key={sec.id}
            id={sec.id}
            title={sec.title}
            icon={sec.icon}
            color={sec.color}
          >
            {/* You can move your current children content here as JSX for each section */}
            {/* For brevity, include your content similarly as before */}
            {/* Example for Information We Collect */}
            {sec.id === "information-collect" && (
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We collect information to provide you with the best bike and
                  scooter rental experience. Here's what we gather:
                </p>
                {/* ... rest of the content */}
              </div>
            )}
            {/* Add similar conditionals for other sections or extract to separate components */}
          </SectionCard>
        ))}
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
