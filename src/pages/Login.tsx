import { Link, useNavigate } from "react-router-dom";
import useEmailNumberValidator from "../hooks/useEmailNumberValidator";
import { useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../store/UserSlice";
import axiosInstance from "../api/axiosInstance";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inValidMailNumber, setinValidMailNumber] = useState(false);
  const { isTenDigitNumber, validateEmail } = useEmailNumberValidator();
  const loginFormSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // if (data.password.length < 6) {
    //   toast.warn("Your password must contain at least 6 character");
    //   return;
    // }
    if (!isTenDigitNumber(data.email_phone as string)) {
      data.email = data.email_phone;
      if (!validateEmail(data.email_phone as string)) {
        console.log("invalid_email");
        setinValidMailNumber(true);
        console.log("yeah i am here");
        toast.error("Incorrect username or password", {
          position: "top-right",
        });
        return;
      }
    } else {
      console.log("i am here");
      data.mobileNo = data.email_phone;
    }
    try {
      console.log("call-backend", data);
      const res = await axiosInstance.post("/api/auth/user/login", data, {
        withCredentials: true,
      });
      dispatch(userSliceActions.setUser(res.data));
      toast.success("Logged In Succesfully", { position: "top-right" });
      navigate("/");
      console.log("Request to backend", res);
    } catch (err: any) {
      toast.error(`${err.response?.data?.message}`, {
        position: "top-right",
      });
      return;
    }
  };
  // const onLoginHandler = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse.credential),
  //   onError: () => console.log("login failed"),
  // });
  const { onSuccess, onError } = useGoogleAuth();
  return (
    <div className="md:min-h-screen min-h-full  flex md:items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 mx-4  my-4">
        {/* <!-- Logo --> */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="newLogo.jpg"
            alt="logo"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            BikeRent Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* <!-- Login Form --> */}
        <form className="space-y-5" onSubmit={(e) => loginFormSubmit(e)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email / Phone
            </label>
            <input
              type="text"
              placeholder="Enter Email / Phone"
              name="email_phone"
              className={`mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl 
                          focus:outline-none 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                           inValidMailNumber
                             ? "border-2 border-red-400 focus:ring-1 focus:ring-red-400 "
                             : "focus:ring-2 focus:ring-yellow-400"
                         }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl 
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none pr-10 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                             inValidMailNumber
                               ? "border-2 border-red-400 focus:ring-1 focus:ring-red-400 "
                               : "focus:ring-2 focus:ring-yellow-400"
                           }`}
              />
              {/* <!-- Toggle Icon --> */}
              <button
                type="button"
                id="togglePassword"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-600"
              >
                <i data-lucide="eye"></i>
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-600 hover:underline float-right mt-1"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-xl transition"
          >
            🔓 Login
          </button>
        </form>

        {/* <!-- Divider --> */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* <!-- Social Login --> */}
        <div className="flex gap-3">
          <button
            // onClick={() => onLoginHandler()}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2 
                             hover:bg-gray-50 dark:hover:bg-gray-700 
                             flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 relative"
          >
            <img
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="google"
            />
            Google
            {/* <div className="opacity-0 absolute left-0 top-0 w-full h-full"> */}
            <div
              className="opacity-0 absolute left-0 top-0 w-full"
              style={{
                transform: "scaleX(1.5)", // Scale to fit wider
                transformOrigin: "left center",
              }}
            >
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </div>
          </button>
        </div>
        {/* <button
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2 
                             hover:bg-gray-50 dark:hover:bg-gray-700 
                             flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200"
          >
            <img
              src="https://img.icons8.com/ios-filled/24/1877f2/facebook-new.png"
              alt="fb"
            />
            Facebook
          </button> */}

        {/* <!-- Signup Redirect --> */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span className="text-yellow-600 font-medium hover:underline">
            <Link to="/sign-up">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
