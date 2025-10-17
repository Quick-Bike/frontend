import React from "react";
import { useAppSelector } from "../hooks/selectorHook";
import { useLocation } from "react-router-dom";
import VehicleListing from "../components/VehicleListing";
import type { Vehicle, BookedSlot } from "../hooks/vehicle";
import type { TimeRange } from "../components/VehicleListing";

interface VehicleState {
  all: Vehicle[];
  filtered: Vehicle[];
  loader: boolean;
  availableBikes: Vehicle[];
}

const ShowAvailableBikes: React.FC = () => {
  const location = useLocation();
  const times = location.state as TimeRange; // guaranteed defined by navigation

  const items = useAppSelector((state) => state.vehicle_slice) as VehicleState;

  const availableBikes = React.useMemo<Vehicle[]>(() => {
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = times;
    const start = new Date(`${pickUpDate}T${pickUpTime}`).getTime();
    const end = new Date(`${dropOffDate}T${dropOffTime}`).getTime();

    return items.all.map((v) => {
      const overlap = v.bookedSlots.some((s: BookedSlot) => {
        const sStart = new Date(`${s.pickUpDate}T${s.pickUpTime}`).getTime();
        const sEnd = new Date(`${s.dropOffDate}T${s.dropOffTime}`).getTime();
        return start < sEnd && sStart < end;
      });
      return {
        ...v,
        availableFrom: overlap
          ? new Date(
              Math.max(
                ...v.bookedSlots.map((s) =>
                  new Date(`${s.dropOffDate}T${s.dropOffTime}`).getTime()
                )
              )
            ).toISOString()
          : null,
      };
    });
  }, [times, items.all]);

  return (
    <VehicleListing
      AvailableVehicles={availableBikes}
      availabilty={false}
      time={times}
    />
  );
};

export default ShowAvailableBikes;
