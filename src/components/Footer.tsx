import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  const items = [
    { url: "/", field: "Home" },
    { url: "/", field: "Vehicles" },
    { url: "/", field: "Explore" },
    { url: "/", field: "Contact" },
  ];
  return (
    <footer className=" text-gray-700 pt-10 border-t border-gray-600 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center space-x-2 text-gray-900 text-white">
            <i className="fas fa-bicycle text-2xl "></i>
            <h2 className="text-xl font-bold ">BookMyBike</h2>
          </div>
          <p className="mt-4 text-sm text-gray-600 ">
            Your trusted partner for bike and scooter rentals.
            <br />
            Experience the freedom of the road with our premium fleet
            <br />
            and exceptional service.
          </p>

          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-blue-600 hover:scale-110 transform transition"
            >
              <i className="fab fa-facebook fa-lg">
                <FaFacebook />
              </i>
            </a>
            <a
              href="https://www.instagram.com/pithoragarhweddings?igsh=Mnoxa3EzN3A4NWZj"
              className="text-pink-600 hover:scale-110 transform transition"
              target="_blank"
            >
              <i className="fab fa-instagram fa-lg">
                <FaInstagram />
              </i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className="hover:text-blue-600 dark:hover:text-yellow-600"
                >
                  {item.field}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <i className="fas fa-phone text-blue-600"></i>
              <span>+917536018155</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-envelope text-blue-600"></i>
              <span>info@bookmybike.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt text-blue-600"></i>
              <span>Joshi Sweets , Near Kamal Barat Ghar, Pithoragarh</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-10 py-4 text-center text-sm text-gray-500">
        © 2025 BookMyBike. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
