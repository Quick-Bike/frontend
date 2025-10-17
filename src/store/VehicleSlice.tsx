import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define slot type for booking info
interface BookedSlot {
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
}

// Define vehicle type
interface Vehicle {
  id: string;
  type: string;
  bookedSlots: BookedSlot[];
  availableFrom: string | null; // ISO string or null
  // add other vehicle fields if needed
}

// State type
interface VehicleState {
  all: Vehicle[];
  filtered: Vehicle[];
  loader: boolean;
  availableBikes: Vehicle[];
}

const initialState: VehicleState = {
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
    addingVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.all = action.payload;
      state.filtered = action.payload;
    },
    loaderTrue: (state) => {
      state.loader = true;
    },
    loaderFalse: (state) => {
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

      state.availableBikes = updatedBikes;
    },
  },
});

export const VehicleList_Action = VehicleSlice.actions;
export default VehicleSlice.reducer;
