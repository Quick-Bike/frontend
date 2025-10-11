import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { VehicleList_Action } from "../store/VehicleSlice";
import { userSliceACtion } from "../store/UserSlice";
// const [sort, setSort] = useState("Recommended");

const useFetchVehicle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVehicle = async () => {
      dispatch(VehicleList_Action.loaderTrue());
      const res = await axios.get("http://localhost:5000/product/vehicle/get");
      console.log(res);
      dispatch(VehicleList_Action.addingVehicles(res.data));
      dispatch(VehicleList_Action.loaderFalse());
    };
    fetchVehicle();
  }, [dispatch]);
};

const useFetchUSerData = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const seeingTheuserTesting = async () => {
      console.log("i was there");
      try {
        if (!user.isLoggedIn) {
          const res = await axios.get(
            "http://localhost:5000/api/auth/user/get",
            {
              withCredentials: true,
            }
          );
          dispatch(userSliceACtion.setUser(res.data));
        }
        // console.log("i am res user", res);
      } catch (err) {
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
