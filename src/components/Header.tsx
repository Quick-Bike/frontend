import logo from "/image.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Sidebar from "./SideBar";
import ProfileDropdown from "../pages/ProfileDropdown";
import { useSelector } from "react-redux";
const Header = () => {
  const items = [
    { field: "Home", URL: "/" },
    { field: "Vehicle", URL: "/vehicle" },
    { field: "About", URL: "" },
    { field: "Contact", URL: "/support" },
  ];
  // const items = [
  //   { field: "🏠 Home", URL: "/" },
  //   { field: "🚗 Vehicle", URL: "/vehicle" },
  //   { field: "📦 About", URL: "/about" },
  //   { field: "📞 Contact", URL: "/contact" },
  // ];
  const userLogged = useSelector((state) => state.user.isLoggedIn);
  // console.log("status", userLogged);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDrop, setAboutDrop] = useState(false);
  console.log("about", aboutDrop);
  const link =
    "https://www.google.co.in/maps/place/Pahadi+Rides+%E2%80%93+Bike,+Bullet+%26+Scooty+Rentals+in+Pithoragarh/@29.583329,80.2070243,19.33z/data=!4m15!1m8!3m7!1s0x39a125c00088dd51:0x2b781d30a1523c63!2sPithoragarh,+Uttarakhand!3b1!8m2!3d29.5828604!4d80.2181884!16zL20vMDljX3R3!3m5!1s0x39a125cc58d61d9d:0x9a32f4ee2ebb392d!8m2!3d29.5832251!4d80.2071811!16s%2Fg%2F11ltnp30vg?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D";
  return (
    <>
      <nav className="dark:bg-gray-900 flex justify-between items-center px-6 py-3 shadow-md h-16 dark:border-b dark:border-gray-600 dark:text-white text-gray-900 ">
        {/* <nav className="dark:bg-gray-900 flex justify-between items-center px-6 py-3 shadow-2xl h-16 dark:border-b dark:border-gray-600 dark:text-white text-gray-900 "> */}
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer">
            Book My Bike Online
          </h1>
        </div>
        <ul className="hidden md:flex gap-20">
          {items.map((item, index) => (
            <Link
              to={item.URL}
              key={index}
              className="cursor-pointer"
              {...(item.field == "About"
                ? {
                    onClick: (e) => {
                      e.preventDefault();
                      setAboutDrop(!aboutDrop);
                    },
                    onMouseMove: () => {
                      setAboutDrop(true);
                    },
                  }
                : {})}
            >
              <li
                key={index}
                className="hover:text-orange-600 dark:hover:text-yellow-600 font-bold relative"
              >
                {item.field}
                {item.field === "About" && aboutDrop && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg z-50
             dark:bg-gray-900 dark:border-gray-700
             opacity-0 translate-y-[-10px] transition-all duration-300 ease-in-out
             visible opacity-100 translate-y-0 "
                    style={{ animationFillMode: "forwards" }}
                    onMouseLeave={() =>
                      setTimeout(() => setAboutDrop(false), 1000)
                    }
                  >
                    <Link
                      to="/about-us"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/privacy/policy"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms/condition"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Terms & Conditions
                    </Link>
                    <a
                      onClick={() =>
                        window.open(
                          "https://www.google.co.in/maps/place/Pahadi+Rides+%E2%80%93+Bike,+Bullet+%26+Scooty+Rentals+in+Pithoragarh/@29.583329,80.2070243,19.33z/data=!4m15!1m8!3m7!1s0x39a125c00088dd51:0x2b781d30a1523c63!2sPithoragarh,+Uttarakhand!3b1!8m2!3d29.5828604!4d80.2181884!16zL20vMDljX3R3!3m5!1s0x39a125cc58d61d9d:0x9a32f4ee2ebb392d!8m2!3d29.5832251!4d80.2071811!16s%2Fg%2F11ltnp30vg?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
                          "_blank"
                        )
                      }
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Location
                    </a>
                  </div>
                )}
              </li>
            </Link>
          ))}
        </ul>

        {/* Desktop User Buttons */}
        <div className="hidden md:flex gap-6 items-center">
          <ThemeToggle />
          {!userLogged ? (
            <>
              <button className="cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
              <button className="dark:bg-yellow-600 bg-gray-900 rounded h-10 w-20 text-white cursor-pointer">
                <Link to="/sign-up">Sign-up</Link>
              </button>
            </>
          ) : (
            <ProfileDropdown></ProfileDropdown>
          )}
        </div>
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </nav>
      {/* Sidebar for Mobile */}
      <div className="md:hidden">
        <Sidebar
          isOpen={menuOpen}
          setisOpen={setMenuOpen}
          headerItems={items}
          userStatus={userLogged}
        />
      </div>
    </>
  );
};
export default Header;
