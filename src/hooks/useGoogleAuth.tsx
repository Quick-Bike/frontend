import { useDispatch } from "react-redux";
import { userSliceActions } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import type { CredentialResponse } from "@react-oauth/google";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // Send Google ID token to backend for verification & login/signup
      const res = await axiosInstance.post(
        "/api/auth/google",
        {
          idToken: credentialResponse.credential,
        },
        { withCredentials: true }
      );
      dispatch(userSliceActions.setUser(res.data));
      navigate("/");
      console.log(res);
      // console.log("User logged in:", credentialResponse.credential);
      // Save your app token (e.g., JWT) for auth in localStorage or context here
    } catch (err: any) {
      toast.error("Login failed:", err.response?.data || err.message);
    }
  };

  const onError = () => {
    toast.error("Google Sign In Failed");
  };
  return { onSuccess, onError };
};
export default useGoogleAuth;
