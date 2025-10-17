import { configureStore } from "@reduxjs/toolkit";
import vehicleSlice from "./VehicleSlice";
import userSlice from "./UserSlice"; // remove .tsx extension here

const TripStore = configureStore({
  reducer: {
    vehicle_slice: vehicleSlice,
    user: userSlice,
  },
});

// Export inferred RootState and AppDispatch types
export type RootState = ReturnType<typeof TripStore.getState>;
export type AppDispatch = typeof TripStore.dispatch;

export default TripStore;
