import { useState } from "react";
// import {ShoppingCart } from "lucide-react";
import { VehicleList_Action } from "../store/VehicleSlice";

import { useDispatch } from "react-redux";
export default function Vehicle_Filter() {
  // const [type, setType] = useState("All Vehicles");
  const [filter, setFilter] = useState<string>("All Vehicles");
  // console.log("filter", filter);
  // Filtering
  const dispatch = useDispatch();

  const onClickTypeHandler = (f: string) => {
    dispatch(VehicleList_Action.vehicleTypeChoose(f));
    setFilter(f);
  };
  // const filteredVehicles =
  //   filter === "All Vehicles"
  //     ? AvailableVehicles
  //     : AvailableVehicles.filter((v) => v.type === filter);

  // Sorting
  // if (sort === "Low to High") {
  //   filteredVehicles = [...filteredVehicles].sort((a, b) => a.price - b.price);
  // } else if (sort === "High to Low") {
  //   filteredVehicles = [...filteredVehicles].sort((a, b) => b.price - a.price);
  // }
  return (
    <div className=" px-6 py-10 max-w-7xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Available Bikes & Scooties</h1>
          <p className="text-gray-600">
            Find the perfect ride for your adventure
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {["All Vehicles", "Bike", "Scooty"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full transition ${
                filter === f
                  ? "bg-gray-900 dark:bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-400"
              }`}
              onClick={() => {
                onClickTypeHandler(f);
              }}
            >
              {f}
            </button>
          ))}

          {/* Dropdown */}
          {/* <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border  rounded-lg"
          >
            <option>Recommended</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}
