import { configureStore } from "@reduxjs/toolkit";
import VehicleSlice from "./VehicleSlice";
import userSlice from "./UserSlice";
const TripStore = configureStore({
  reducer: {
    vehicle_slice: VehicleSlice,
    user: userSlice,
  },
});

export default TripStore;
