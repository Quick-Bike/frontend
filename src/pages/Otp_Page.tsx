import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../store/UserSlice";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const length = 6;
  const pattern = /^\d*$/; // allow only digits
  const inputs = inputsRef.current;
  const location = useLocation();
  const state = location.state as number | undefined;

  const verifyOtp = async (finalOtp: string): Promise<void> => {
    if (finalOtp.length < length) {
      alert("Please enter full OTP");
      return;
    }
    console.log("Verifying OTP:", finalOtp);
    try {
      let res;
      if (state === 2) {
        res = await axiosInstance.post(
          "/api/auth/user/verify",
          { otp: finalOtp },
          { withCredentials: true }
        );
      } else if (state === 1) {
        res = await axiosInstance.post(
          "/api/auth/user/resetpassword",
          { otp: finalOtp },
          { withCredentials: true }
        );
        res.data = res.data.user;
      } else {
        toast.error("Invalid request state", { position: "top-right" });
        return;
      }
      dispatch(userSliceActions.setUser(res?.data));
      toast.success(
        `${
          state === 2
            ? "Account created successfully"
            : "Logged in successfully"
        }`,
        { position: "top-right" }
      );
      navigate("/");
    } catch (err: any) {
      toast.error(`${err.response?.data?.message || err.message}`, {
        position: "top-right",
      });
    }
  };

  const handleChange = (value: string, index: number): void => {
    if (!pattern.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (!pattern.test(paste)) return;
    const newOtp = paste.slice(0, length).split("");
    for (let i = 0; i < length; i++) {
      if (inputs[i]) inputs[i]!.value = newOtp[i] || "";
      if (newOtp[i] && i < length - 1) {
        inputs[i + 1]?.focus();
      }
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputs[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] md-min-h-[70vh] bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 dark:text-yellow-600">
          Verify OTP
        </h2>
        <p className="text-gray-600 text-center mb-6">Enter the 6-digit OTP</p>

        <div className="flex justify-evenly mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(input) => {
                inputs[index] = input; // assign but return void
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg border rounded-xl focus:outline-none focus:border-yellow-500"
            />
          ))}
        </div>

        <button
          onClick={() => verifyOtp(otp.join(""))}
          className="w-full bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Verify OTP
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Didn't receive the OTP?{" "}
          <button className="text-yellow-600 font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
