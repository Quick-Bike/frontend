import { Link, useNavigate } from "react-router-dom";

import useEmailNumberValidator from "../hooks/useEmailNumberValidator";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";
import axiosInstance from "../api/axiosInstance";

const Sign_up = () => {
  const navigate = useNavigate();
  const { isTenDigitNumber, validateEmail } = useEmailNumberValidator();
  const [inValidMailNumber, setinValidMailNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState();
  const [mismatch, setMismatch] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (password.length > 0) {
        if (password != confirmPassword) {
          console.log("true");
          setMismatch(true);
          console.log(mismatch);
        } else {
          setMismatch(false);
        }
      }
    }, 1000);
    return () => clearTimeout(handler); // cleanup on new keystroke
  }, [confirmPassword]);
  const signUpFormSubmit = async (e: any) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn("Your password must contain at least 6 character");
      return;
    }
    if (mismatch) {
      toast.warn("Match your password first", { position: "top-right" });
      return;
    } else {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      if (!isTenDigitNumber(data.email_phone as string)) {
        data.email = data.email_phone;
        if (!validateEmail(data.email_phone as string)) {
          setinValidMailNumber(true);
          toast.warn("Enter Correct Email/Number", { position: "top-right" });
          return;
        }
        // navigate("/");
      } else {
        data.mobileNo = data.email_phone;
      }
      console.log(data);
      try {
        setLoader(true);
        const res = await axiosInstance.post("/api/auth/user/register", data, {
          withCredentials: true,
        });
        setLoader(false);
        console.log("Request to backend", res);
        navigate("/otp", { state: 2 });
      } catch (err: any) {
        toast.error(`${err.response?.data?.message}`, {
          position: "top-right",
        });
        return;
      }
    }
  };
  const { onSuccess, onError } = useGoogleAuth();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 md:m-4 mx-4">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="newLogo.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sign up to start your journey.
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={(e) => signUpFormSubmit(e)}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                name="name"
                required
                placeholder="Enter Name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none 
                           bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email_number"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address/Phone Number
              </label>
              <input
                id="email_number"
                type="text"
                required
                name="email_phone"
                placeholder="Enter Email or Number"
                className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl 
                            focus:outline-none 
                           bg-white text-gray-900 placeholder-gray-400 ${
                             inValidMailNumber
                               ? "border-2 border-red-400 focus:ring-1 focus:ring-red-400 "
                               : "focus:ring-2 focus:ring-yellow-400"
                           }`}
              />
            </div>
            {/* Phone */}
            {/* <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter Your Number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none 
                           bg-white text-gray-900 placeholder-gray-400"
              />
            </div> */}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-yellow-400 focus:outline-none pr-10 
                             bg-white text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  id="togglePassword"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-600"
                >
                  <i data-lucide="eye"></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  required
                  id="confirmPassword"
                  type="password"
                  onChange={(e: any) => setconfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-yellow-400 focus:outline-none pr-10 
                             bg-white text-gray-900 placeholder-gray-400"
                />
                {mismatch && (
                  <p className="text-red-400 mt-1 text-base font-medium">
                    Password do not match
                  </p>
                )}
                <button
                  type="button"
                  id="toggleConfirmPassword"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-600"
                >
                  <i data-lucide="eye"></i>
                </button>
              </div>
            </div>

            {/* Submit */}
            {loader ? (
              <div className="w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-xl transition gap-6">
                <div className="loader h-10"></div>
                <div className="text-xl">Sending Otp</div>{" "}
                {/* <div className="dotLoader h-1 w-7 mt-3"></div> */}
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-xl transition"
              >
                🚴 Sign Up
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              Or sign up with
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2 
                               hover:bg-gray-50 dark:hover:bg-gray-700 
                               flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 relative"
            >
              <img
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="google"
              />
              Google
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
          </div>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            By signing up, you agree to our{" "}
            <Link
              to="/terms/condition"
              className="text-yellow-600 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy/policy"
              className="text-yellow-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};
export default Sign_up;
