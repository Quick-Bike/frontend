import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useEmailNumberValidator from "../hooks/useEmailNumberValidator";
import { toast } from "react-toastify";
import axios from "axios";

export default function ForgotPassword(): React.JSX.Element {
  // Ref for input element
  const email_number = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { validateEmail, isTenDigitNumber } = useEmailNumberValidator();
  // const [invalid, setInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const otpHandler = async (): Promise<void> => {
    if (!email_number.current) return;

    setLoader(true);

    const value = email_number.current.value.trim();
    const payload: { email?: string; mobileNo?: string } = {};

    if (!isTenDigitNumber(value)) {
      payload.email = value;
      if (!validateEmail(value)) {
        // setInvalid(true);
        toast.warn("Enter Correct Email/Number", { position: "top-right" });
        setLoader(false);
        return;
      }
      console.log("Request to backend with email");
    } else {
      payload.mobileNo = value;
      console.log("Request to backend with mobile number");
    }

    try {
      // Send request to backend with payload
      console.log("request to backend", payload);
      // Example: await axios.post("/api/request-otp", payload);
      await axios.post(
        "http://localhost:5000/api/auth/user/forget-password",
        payload
      );

      setLoader(false);
      navigate("/otp", { state: 1 });
      // On success, navigate to OTP page
      // navigate("/otp");
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 dark:text-yellow-600">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your registered email/number to get OTP.
        </p>

        <input
          type="text"
          ref={email_number}
          placeholder="Enter your email/number"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        <button
          onClick={otpHandler}
          disabled={loader}
          className="w-full bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
        >
          {loader ? "Sending..." : "Send OTP"}
        </button>

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
