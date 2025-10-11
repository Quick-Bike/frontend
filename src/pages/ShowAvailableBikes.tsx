import React from "react";
import VehicleListing from "../components/VehicleListing";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const ShowAvailableBikes = () => {
  const location = useLocation();
  const times = location.state;
  const items = useSelector((state) => state.vehicle_slice);
  const availableBikes = React.useMemo(() => {
    if (!times || !items.all) return [];

    const requestedStart = new Date(
      times.pickUpDate + "T" + times.pickUpTime
    ).getTime();
    const requestedEnd = new Date(
      times.dropOffDate + "T" + times.dropOffTime
    ).getTime();

    const updatedBikes = items.all.map((vehicle) => {
      const overlappingSlots = vehicle.bookedSlots.filter((slot) => {
        const slotStart = new Date(
          slot.pickUpDate + "T" + slot.pickUpTime
        ).getTime();
        const slotEnd = new Date(
          slot.dropOffDate + "T" + slot.dropOffTime
        ).getTime();
        return requestedStart < slotEnd && slotStart < requestedEnd;
      });

      if (overlappingSlots.length === 0) {
        return { ...vehicle, availableFrom: null };
      } else {
        const latestDropOff = overlappingSlots.reduce((latest, slot) => {
          const slotEnd = new Date(
            slot.dropOffDate + "T" + slot.dropOffTime
          ).getTime();
          return slotEnd > latest ? slotEnd : latest;
        }, 0);

        const availableFromDate = new Date(latestDropOff).toISOString();

        return { ...vehicle, availableFrom: availableFromDate };
      }
    });

    return updatedBikes;
  }, [times, items.all]);
  return (
    <>
      <VehicleListing
        AvailableVehicles={availableBikes}
        availabilty={false}
        time={times}
      />
    </>
  );
};
export default ShowAvailableBikes;
