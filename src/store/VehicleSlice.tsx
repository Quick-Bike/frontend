import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  all: [],
  filtered: [],
  loader: false,
  availableBikes: [],
};

const VehicleSlice = createSlice({
  name: "vehicle_slice",
  initialState,
  reducers: {
    vehicleTypeChoose: (state, action: PayloadAction<string>) => {
      if (action.payload === "All Vehicles") {
        state.filtered = state.all;
        return;
      }
      state.filtered = state.all.filter((item) => item.type === action.payload);
    },
    addingVehicles: (state, action) => {
      // console.log(action, state, action.payload);
      state.all = action.payload;
      state.filtered = action.payload;
      // return action.payload;
    },
    loaderTrue: (state) => {
      console.log("true");
      state.loader = true;
    },
    loaderFalse: (state) => {
      console.log("false");
      state.loader = false;
    },
    addingAvailableBikes: (
      state,
      action: PayloadAction<{
        pickUpDate: string;
        pickUpTime: string;
        dropOffDate: string;
        dropOffTime: string;
      }>
    ) => {
      const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } =
        action.payload;
      const requestedStart = new Date(pickUpDate + "T" + pickUpTime).getTime();
      const requestedEnd = new Date(dropOffDate + "T" + dropOffTime).getTime();

      const updatedBikes = state.all.map((vehicle) => {
        // Check if vehicle is booked during requested period
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
          // Vehicle is available, no availableFrom needed
          return { ...vehicle, availableFrom: null };
        } else {
          // Vehicle is not available, find the latest dropOffDate/time among overlapping slots
          const latestDropOff = overlappingSlots.reduce((latest, slot) => {
            const slotEnd = new Date(
              slot.dropOffDate + "T" + slot.dropOffTime
            ).getTime();
            return slotEnd > latest ? slotEnd : latest;
          }, 0);

          // Convert latestDropOff back to ISO string or desired format
          const availableFromDate = new Date(latestDropOff).toISOString();

          return { ...vehicle, availableFrom: availableFromDate };
        }
      });

      // Optionally, you can separate available and unavailable bikes or keep all together
      state.availableBikes = updatedBikes;
    },
  },
});
export const VehicleList_Action = VehicleSlice.actions;
export default VehicleSlice.reducer;
