// import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useEmailNumberValidator from "../hooks/useEmailNumberValidator";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
export default function ForgotPassword() {
  const email_number = useRef("");
  const { validateEmail, isTenDigitNumber } = useEmailNumberValidator();
  const [invalid, setInvalid] = useState(false);
  const otpHandler = () => {
    if (!isTenDigitNumber(email_number.current.value as string)) {
      if (!validateEmail(email_number.current.value as string)) {
        setInvalid(true);
        toast.warn("Enter Correct Email/Number", { position: "top-right" });
        return;
      }
      navigate("/otp");
      console.log("Request to backend");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 dark:text-yellow-600">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your registered email/number to get OTP.
        </p>

        {/* Email Input */}
        <input
          type="text"
          ref={email_number}
          placeholder="Enter your email/number"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        {/* Send OTP Button */}
        <button
          onClick={otpHandler}
          className="w-full bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Send OTP
        </button>

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
