import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ProfileDropdown from "../pages/ProfileDropdown";
import { useState } from "react";
export default function Sidebar({
  isOpen,
  setisOpen,
  headerItems,
  userStatus,
}) {
  // console.log(headerItems);
  const [aboutDrop, setAboutDrop] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (item, index) => {
    if (item.field === "About") {
      setExpandedItem(expandedItem === index ? null : index);
    } else {
      setisOpen(false); // Close menu when navigating to other pages
    }
  };
  const clickHandlerOffSet = () => {
    setisOpen(false);
  };
  return (
    <div className="dark:bg-gray-900 text-white">
      {/* Overlay */}
      <div
        onClick={() => clickHandlerOffSet()}
        className={`fixed inset-0  bg-opacity-50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto z-50"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg  transform transition-transform duration-500 ease-in-out dark:bg-gray-900 dark:text-white text-gray-700 will-change-transform`}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Header */}
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Menu
          </h2>
          <button
            onClick={() => clickHandlerOffSet()}
            className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Profile Section */}
        {userStatus && (
          <div className="px-6 py-6 bg-gradient-to-br from-orange-500 to-yellow-500 dark:from-gray-800 dark:to-gray-700">
            <ProfileDropdown />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 space-y-1">
            {headerItems.map((item, index) => (
              <div key={index}>
                {item.field === "About" ? (
                  <>
                    {/* About Item with Dropdown */}
                    <button
                      onClick={() => handleItemClick(item, index)}
                      className="w-full group flex items-center justify-between px-4 py-3 text-left rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-700 dark:text-white transition-all duration-200 border-2 border-transparent hover:border-orange-200 dark:hover:border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:bg-orange-500 transition-colors"></div>
                        <span className="font-semibold text-base">
                          {item.field}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 text-orange-500 ${
                          expandedItem === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Expanded About Submenu */}
                    {expandedItem === index && (
                      <div className="mt-2 ml-6 space-y-1 bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-3 border-l-4 border-orange-400 shadow-inner">
                        <Link
                          to="/about-us"
                          onClick={() => clickHandlerOffSet()}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                          <span>About Us</span>
                        </Link>
                        <Link
                          to="/privacy/policy"
                          onClick={() => clickHandlerOffSet()}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                          <span>Privacy Policy</span>
                        </Link>
                        <Link
                          to="/terms/condition"
                          onClick={() => clickHandlerOffSet()}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                          <span>Terms & Conditions</span>
                        </Link>
                        <button
                          onClick={() => {
                            window.open(
                              "https://www.google.co.in/maps/place/Pahadi+Rides+%E2%80%93+Bike,+Bullet+%26+Scooty+Rentals+in+Pithoragarh/@29.583329,80.2070243,19.33z/data=!4m15!1m8!3m7!1s0x39a125c00088dd51:0x2b781d30a1523c63!2sPithoragarh,+Uttarakhand!3b1!8m2!3d29.5828604!4d80.2181884!16zL20vMDljX3R3!3m5!1s0x39a125cc58d61d9d:0x9a32f4ee2ebb392d!8m2!3d29.5832251!4d80.2071811!16s%2Fg%2F11ltnp30vg?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
                              "_blank"
                            );
                            clickHandlerOffSet();
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group text-left"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                          <span>Location</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  /* Regular Menu Items */
                  <Link
                    to={item.URL}
                    onClick={() => handleItemClick(item, index)}
                    className="group flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-orange-600 dark:hover:text-yellow-400 font-semibold rounded-xl transition-all duration-200 border-2 border-transparent hover:border-orange-200 dark:hover:border-gray-600"
                  >
                    <div className="w-2 h-2 bg-gray-400 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                    <span className="text-base">{item.field}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 h-10">
          <button className="group h-1 flex items-center space-x-3 w-full px-4  text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-orange-200 dark:hover:border-gray-600">
            {/* <div className="p-2 bg-gray-200 dark:bg-gray-600 group-hover:bg-orange-200 dark:group-hover:bg-yellow-600 rounded-lg transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <ThemeToggle />
            </div> */}
            <ThemeToggle />
            <span className="font-medium">Toggle Theme</span>
          </button>
        </div>
        <div className="p-4 space-y-6">
          {!userStatus && (
            <>
              <button
                onClick={() => clickHandlerOffSet()}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition dark:bg-yellow-600 dark:hover:bg-yellow-600"
              >
                <Link to="/login">Login</Link>
              </button>
              <button
                onClick={() => clickHandlerOffSet()}
                className="w-full border border-orange-500 text-orange-600 dark:text-yellow-600 py-2 rounded-lg hover:bg-orange-50 transition dark:border dark:border-yellow-600 "
              >
                <Link to="/sign-up">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
