import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/selectorHook";
import { VehicleList_Action } from "../store/VehicleSlice";
import PickDropTime from "./PickDropTime";
import { toast } from "react-toastify";

export default function Available_Rides() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [pickUpTime, setpickUptime] = useState<string>("05:00 AM");
  const [dropOffTime, setDropOfftime] = useState<string>("05:00 AM");
  const [pickUpState, setPickUpState] = useState<boolean>(false);
  const [dropOffState, setDropOffState] = useState<boolean>(false);
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const pickUpDate = useRef<HTMLInputElement>(null);
  const dropOffDate = useRef<HTMLInputElement>(null);
  const [minDropDate, setMindropdate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const min = new Date(today);
    const max = new Date(today);
    max.setDate(today.getDate() + 45);

    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    setMinDate(formatDate(min));
    setMindropdate(formatDate(min));
    setMaxDate(formatDate(max));
  }, []);

  const fadeInUpClasses = `opacity-0 animate-fadeInUp animation-fill-forwards`;

  const searchBikeHandler = () => {
    if (!pickUpDate.current || !dropOffDate.current) {
      toast.warn("Fill Out the fields First");
      return;
    }
    const pickUpValue = pickUpDate.current.value;
    const dropOffValue = dropOffDate.current.value;

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

    const pickup = new Date(`${pickUpValue}T${hrsPickUp24}`);
    const dropoff = new Date(`${dropOffValue}T${hrsDropOff24}`);

    const durationMs = dropoff.getTime() - pickup.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    if (!Number.isNaN(durationHours)) {
      if (durationHours < 4) {
        toast.warn("Minimum 4 hours required");
        return;
      } else {
        const times = {
          pickUpDate: pickUpValue,
          dropOffDate: dropOffValue,
          pickUpTime: hrsPickUp24,
          dropOffTime: hrsDropOff24,
        };
        dispatch(VehicleList_Action.addingAvailableBikes(times));
        navigate("/available-vahicles", { state: times });
      }
    } else {
      toast.warn("Fill Out the fields First");
    }
  };

  return (
    <div className={`relative bg-gray-50 ${fadeInUpClasses}`}>
      <div className="absolute animate-bgSlide bg-cover bg-center inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Ride Easy.Ride Now
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Premium vehicles, easy booking, and trusted service <br />
            —ready when you are.
          </p>
          <div
            className={`mt-15 bg-white rounded-xl shadow-lg p-6 w-full max-w-md opacity-[0.7] md:opacity-[1] dark:bg-gray-900 dark:text-gray-700 text-gray-700 ${fadeInUpClasses}`}
          >
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
              <div>
                <label className="block font-medium mb-1">Pickup Date</label>
                <input
                  type="date"
                  min={minDate}
                  ref={pickUpDate}
                  max={maxDate}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={() => {
                    if (pickUpDate.current)
                      setMindropdate(pickUpDate.current.value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-300 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Drop-off Date</label>
                <input
                  type="date"
                  ref={dropOffDate}
                  min={minDropDate}
                  onKeyDown={(e) => e.preventDefault()}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-300 focus:ring-2 focus:ring-orange-500"
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
              />
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
