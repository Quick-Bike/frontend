import React from "react";
import Vehicle_Filter from "../components/Vehicle_Filter";
import VehicleListing from "../components/VehicleListing";
import { useAppSelector } from "../hooks/selectorHook";
import type { VehicleState } from "../hooks/vehicle";
import type { TimeRange } from "../components/VehicleListing";

const Vehicle_Page: React.FC = () => {
  // Now items is correctly typed as VehicleState
  const items = useAppSelector((state) => state.vehicle_slice) as VehicleState;

  // Dummy time for availability page
  const dummyTime: TimeRange = {
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Vehicle_Filter />
      <VehicleListing
        AvailableVehicles={items.filtered}
        availabilty={true}
        time={dummyTime}
      />
    </div>
  );
};

export default Vehicle_Page;
