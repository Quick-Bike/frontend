import { useEffect } from "react";

import type { Dispatch, SetStateAction, RefObject } from "react";

interface PickDropTimeProps {
  setpickUptime: Dispatch<SetStateAction<string>>;
  pickUpTime: string;
  setPickUpState: Dispatch<SetStateAction<boolean>>;
  pickUpState: boolean;
  pickupRef: RefObject<HTMLDivElement | null>; // allow null
  dropoffRef: RefObject<HTMLDivElement | null>; // allow null
  dropOffTime: string;
  setDropOfftime: Dispatch<SetStateAction<string>>;
  dropOffState: boolean;
  setDropOffState: Dispatch<SetStateAction<boolean>>;
}

const PickDropTime: React.FC<PickDropTimeProps> = ({
  setpickUptime,
  pickUpTime,
  setPickUpState,
  pickUpState,
  pickupRef,
  dropoffRef,
  dropOffTime,
  setDropOfftime,
  dropOffState,
  setDropOffState,
}) => {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setPickUpState(false);
      }
      if (
        dropoffRef.current &&
        !dropoffRef.current.contains(e.target as Node)
      ) {
        setDropOffState(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [pickupRef, dropoffRef, setPickUpState, setDropOffState]);

  const generateTimeOptions = () => {
    const times: string[] = [];
    const start = 5;
    const end = 22;

    for (let h = start; h <= end; h++) {
      for (let m of ["00", "30"]) {
        if (h === end && m !== "00") continue;
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? "AM" : "PM";
        times.push(`${hour12.toString().padStart(2, "0")}:${m} ${ampm}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <>
      <div>
        <label className="block font-medium mb-1">Pickup Time</label>
        <div ref={pickupRef} className="relative w-full">
          <div
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 dark:bg-gray-300 focus:ring-orange-500 cursor-pointer select-none"
            onClick={() => setPickUpState((prev) => !prev)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPickUpState((prev) => !prev);
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={pickUpState}
            role="button"
          >
            {pickUpTime || "Select time"}
          </div>
          <div
            className={`absolute mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-300 border rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out origin-top transform ${
              pickUpState
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
            role="listbox"
            tabIndex={-1}
          >
            {timeOptions.map((time, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 cursor-pointer select-none ${
                  pickUpTime === time
                    ? "bg-yellow-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-400"
                }`}
                onClick={() => {
                  setpickUptime(time);
                  setPickUpState(false);
                }}
                role="option"
                aria-selected={pickUpTime === time}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setpickUptime(time);
                    setPickUpState(false);
                  }
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Drop-off Time</label>
        <div className="relative w-full" ref={dropoffRef}>
          <div
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 dark:bg-gray-300 focus:ring-orange-500 cursor-pointer select-none"
            onClick={() => setDropOffState((prev) => !prev)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setDropOffState((prev) => !prev);
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={dropOffState}
            role="button"
          >
            {dropOffTime || "Select time"}
          </div>

          <div
            className={`absolute mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-300 border rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out origin-top transform ${
              dropOffState
                ? "opacity-100 scale-y-100 z-1000 pointer-events-auto"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
            role="listbox"
            tabIndex={-1}
          >
            {timeOptions.map((time, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 cursor-pointer select-none ${
                  dropOffTime === time
                    ? "bg-yellow-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-400"
                }`}
                onClick={() => {
                  setDropOfftime(time);
                  setDropOffState(false);
                }}
                role="option"
                aria-selected={dropOffTime === time}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDropOfftime(time);
                    setDropOffState(false);
                  }
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PickDropTime;
