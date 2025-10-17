import type { FC } from "react";
import { useState } from "react";
import type { Vehicle } from "../hooks/vehicle";
import { useSelector } from "react-redux";
import AuthPopup from "../pages/AuthPop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface TimeRange {
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
}

interface VehicleListingProps {
  AvailableVehicles: Vehicle[];
  availabilty: boolean;
  time: TimeRange; // accept TimeRange, not primitive
}

const VehicleListing: FC<VehicleListingProps> = ({
  AvailableVehicles,
  availabilty,
  time,
}) => {
  const [authOpen, setIsAuthOpen] = useState<boolean>(false);
  const userLogged = useSelector(
    (state: any) => state.user.isLoggedIn
  ) as boolean;
  const navigate = useNavigate();

  const formattingDates = (data: string | Date) => {
    const date = new Date(data);
    return date.toLocaleDateString("en-GB");
  };

  const onBookNowHandler = (v: Vehicle) => {
    if (!userLogged) {
      setIsAuthOpen(true);
    } else {
      const context = {
        v: v,
        time: time,
      };
      navigate("/booking-details", { state: context });
    }
  };

  const onAvailiabilyButtonHandler = () => {
    toast.info("Enter your details first", {
      position: "top-right",
    });
    navigate("/");
  };

  const notAvailableHandler = (date: string | null | undefined) => {
    if (!date) return;
    toast.warn(
      `This will be available after ${formattingDates(date).replace(
        /\//g,
        "-"
      )}`
    );
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-500 bg-white ">
      <div className=" px-6 py-10 max-w-7xl mx-auto ">
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {AvailableVehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 relative transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50 dark:hover:bg-gray-600"
            >
              {/* Main Image */}
              <img
                src={v.image}
                alt={v.name}
                className="w-full h-40 object-contain transition-transform duration-300 hover:scale-110"
              />

              {/* Info */}
              <h2 className="text-lg font-semibold mt-3">{v.name}</h2>
              <p className="text-orange-500 text-sm">
                {v.type} • {v.details}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl font-bold">₹{v.price}/day</span>
                <span className="text-gray-400 line-through">
                  ₹{v.oldPrice}/day
                </span>
              </div>
              {/* Button */}
              {!availabilty ? (
                v.availableFrom ? (
                  <button
                    onClick={() => notAvailableHandler(v.availableFrom)}
                    className="w-full  text-white py-2 mt-4 rounded-xl flex bg-red-500 items-center justify-center gap-2 opacity-80 dark:opacity-90   transition"
                  >
                    Available from{" "}
                    {formattingDates(v.availableFrom).replace(/\//g, "-")}
                  </button>
                ) : (
                  <button
                    onClick={() => onBookNowHandler(v)}
                    className="w-full text-white bg-gray-800 py-2 mt-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-yellow-700 dark:bg-yellow-600 transition"
                  >
                    Book Now
                  </button>
                )
              ) : (
                <button
                  onClick={() => onAvailiabilyButtonHandler()}
                  className="w-full bg-gray-900 text-white py-2 mt-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray- dark:hover:bg-yellow-700 dark:bg-yellow-600 transition"
                >
                  Check Availability
                </button>
              )}
            </div>
          ))}
        </div>
        {authOpen && <AuthPopup isOpen={authOpen} onClose={setIsAuthOpen} />}
      </div>
    </div>
  );
};

export default VehicleListing;
