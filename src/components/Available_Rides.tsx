import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { VehicleList_Action } from "../store/VehicleSlice";
import { useNavigate } from "react-router-dom";
import PickDropTime from "./PickDropTime";
import { toast } from "react-toastify";
export default function Available_Rides() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [pickUpTime, setpickUptime] = useState<string>("05:00 AM");
  const [dropOffTime, setDropOfftime] = useState<string>("05:00 AM");
  const [pickUpState, setPickUpState] = useState<boolean>(false);
  const [dropOffState, setDropOffState] = useState<boolean>(false);
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);
  const pickUpDate = useRef("");
  const dropOffDate = useRef("");
  // Calculate allowed booking dates
  const [minDropDate, setMindropdate] = useState("");
  useEffect(() => {
    const today = new Date();

    // Minimum: today
    const min = new Date(today);

    // Maximum: 7 days from today
    const max = new Date(today);
    max.setDate(today.getDate() + 45);

    // Format YYYY-MM-DD for input
    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    setMinDate(formatDate(min));
    setMindropdate(formatDate(min));
    setMaxDate(formatDate(max));
    // setMindropdate(minDate);
    // console.log("mindate", minDate);
    // console.log("mindate", minDate);
    // console.log("dropdaate", minDropDate);
  }, []);
  const fadeInUpClasses = `opacity-0  animate-fadeInUp animation-fill-forwards`;
  const searchBikeHandler = () => {
    console.log("hiii", pickUpDate.current.value);
    const date = new Date(`1970-01-01 ${pickUpTime}`);
    const hrsPickUp24 = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date2 = new Date(`1970-01-01 ${dropOffTime}`);
    const hrsDropOff24 = date2.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const pickup = new Date(`${pickUpDate.current.value}T${hrsPickUp24}`);
    const dropoff = new Date(`${dropOffDate.current.value}T${hrsDropOff24}`);
    // Get difference in milliseconds
    console.log("pickup", pickup);
    console.log("dropof", dropoff);
    const durationMs = dropoff.getTime() - pickup.getTime();
    // Convert to hours
    const durationHours = durationMs / (1000 * 60 * 60);
    console.log("hours", durationHours);
    if (!Number.isNaN(durationHours)) {
      if (durationHours < 4) {
        console.log("yes");
        toast.warn("Minimum 4 hours required");
        return;
      } else {
        console.log("no");
        const times = {
          pickUpDate: pickUpDate.current.value,
          dropOffDate: dropOffDate.current.value,
          pickUpTime: hrsPickUp24,
          dropOffTime: hrsDropOff24,
        };
        console.log("newHere", times);
        dispatch(VehicleList_Action.addingAvailableBikes(times));
        navigate("/available-vahicles", { state: times });
      }
    } else {
      toast.warn("Fill Out the fields First");
    }
    // Check if duration is greater than 4 hours
    // return durationHours > 4;
    console.log(durationHours);
    // console.log("date1", date, "date2", date2);
    // console.log("new", hrsPickUp24);
    // console.log("new", hrsDropOff24);
  };
  // Generate time slots (5AM - 10PM)
  // setMindropdate(minDate);
  // console.log("minDate", minDate);
  return (
    <div className={`relative bg-gray-50 ${fadeInUpClasses}`}>
      {/* Background */}
      <div className="absolute animate-bgSlide bg-cover bg-center  inset-0">
        {/* <img
          src={images[currentIndex]}
          alt="Road background"
          className="w-full h-full object-cover  transition-opacity  duration-1000 ease-in-out"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-8 ">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Ride Easy.Ride Now
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Premium vehicles, easy booking, and trusted service <br />
            —ready when you are.
          </p>
          {/* Booking Form */}
          <div
            className={`mt-15 bg-white rounded-xl shadow-lg p-6 w-full max-w-md opacity-[0.7] md:opacity-[1] dark:bg-gray-900 dark:text-gray-700 text-gray-700  ${fadeInUpClasses}`}
          >
            {/* Location */}
            <label className="block text-gray-800 font-semibold mb-1 dark:text-gray-500">
              Pickup Location
            </label>
            <input
              type="text"
              value="Pithoragarh"
              readOnly
              className="w-full mb-4 px-3 py-2 border rounded-lg bg-white-100 dark:bg-gray-300 cursor-not-allowed text-gray-700"
            />
            <div className="grid grid-cols-2 gap-4">
              {/* Pickup Date */}
              <div>
                <label className="block  font-medium mb-1">Pickup Date</label>
                <input
                  type="date"
                  min={minDate}
                  ref={pickUpDate}
                  max={maxDate}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={() => setMindropdate(pickUpDate.current.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-300 focus:ring-orange-500"
                />
              </div>
              {/* Drop-off Date (no restriction) */}
              <div>
                <label className="block  font-medium mb-1">Drop-off Date</label>
                <input
                  type="date"
                  ref={dropOffDate}
                  min={minDropDate}
                  onKeyDown={(e) => e.preventDefault()}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-300  focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <PickDropTime
                setpickUptime={setpickUptime}
                setPickUpState={setPickUpState}
                pickUpState={pickUpState}
                pickUpTime={pickUpTime}
                pickupRef={pickupRef}
                dropoffRef={dropoffRef}
                dropOffState={dropOffState}
                dropOffTime={dropOffTime}
                setDropOfftime={setDropOfftime}
                setDropOffState={setDropOffState}
              ></PickDropTime>
              {/* Button */}
              <button
                onClick={() => searchBikeHandler()}
                className="mt-6 col-span-2 w-full bg-orange-600 hover:bg-orange-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold md:bg-orange-500"
              >
                Search Available Bikes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
