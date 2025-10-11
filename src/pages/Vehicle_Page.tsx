import { useSelector } from "react-redux";
import Vehicle_Filter from "../components/Vehicle_Filter";
import VehicleListing from "../components/VehicleListing";
const Vehicle_Page = () => {
  const items = useSelector((state) => state.vehicle_slice);
  console.log(items);
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white ">
        <Vehicle_Filter />
        <VehicleListing AvailableVehicles={items.filtered} availabilty={true} />
      </div>
    </>
  );
};
export default Vehicle_Page;
