import { useDispatch } from "react-redux";
import { userSliceACtion } from "../store/UserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = async (credentialResponse) => {
    try {
      // Send Google ID token to backend for verification & login/signup
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          idToken: credentialResponse.credential,
        },
        { withCredentials: true }
      );
      dispatch(userSliceACtion.setUser(res.data));
      navigate("/");
      console.log(res);
      // console.log("User logged in:", credentialResponse.credential);
      // Save your app token (e.g., JWT) for auth in localStorage or context here
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const onError = () => {
    console.error("Google Sign In Failed");
  };
  return { onSuccess, onError };
};
export default useGoogleAuth;
