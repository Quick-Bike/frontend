import { useEffect } from "react";
import { VehicleList_Action } from "../store/VehicleSlice";
import { userSliceActions } from "../store/UserSlice";
import axiosInstance from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "./selectorHook";
// const [sort, setSort] = useState("Recommended");

const useFetchVehicle = () => {
  const baseURL = import.meta.env.VITE_url;
  console.log("url", baseURL);
  // Use it in axios instance or anywhere else

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchVehicle = async () => {
      dispatch(VehicleList_Action.loaderTrue());
      // const res = await axios.get("http://localhost:5000/product/vehicle/get");
      const res = await axiosInstance.get("product/vehicle/get");
      console.log("check", res);
      dispatch(VehicleList_Action.addingVehicles(res.data));
      dispatch(VehicleList_Action.loaderFalse());
    };
    fetchVehicle();
  }, [dispatch]);
};

const useFetchUSerData = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const seeingTheuserTesting = async () => {
      console.log("i was there");
      try {
        if (!user.isLoggedIn) {
          const res = await axiosInstance.get("api/auth/user/get", {
            withCredentials: true,
          });
          dispatch(userSliceActions.setUser(res.data));
        }
        // console.log("i am res user", res);
      } catch (err: any) {
        console.log(err.response);
      }
    };
    seeingTheuserTesting();
  }, [dispatch]);
};
const FetchingAllData = () => {
  useFetchVehicle();
  useFetchUSerData();
  return null;
};
export default FetchingAllData;
