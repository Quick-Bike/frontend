import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSliceACtion } from "../store/UserSlice";
import { toast } from "react-toastify";
export default function OtpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  // constants
  const length = 6;
  const pattern = /^\d*$/; // allow only digits
  const inputs = inputsRef.current;

  // verify OTP
  const verifyOtp = async (finalOtp: string) => {
    if (finalOtp.length < length) {
      alert("Please enter full OTP");
      return;
    }
    const otp = finalOtp;
    console.log("Verifying OTP:", finalOtp);
    const res = await axios.post(
      "http://localhost:5000/api/auth/user/verify",
      { otp: otp },
      { withCredentials: true }
    );

    console.log(res);
    dispatch(userSliceACtion.setUser(res.data));
    toast.success("Account created successfully", {
      position: "top-right",
    });
    navigate("/");
    // 🚨 Call backend here
  };

  // implementing handle change
  const handleChange = (value: string, index: number) => {
    if (!pattern.test(value)) return; // Only allow digits

    let newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input field
    if (value && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  };

  // handling paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (!pattern.test(paste)) return; // Only allow digits

    const newOtp = paste.slice(0, length).split("");
    for (let i = 0; i < length; i++) {
      if (inputs[i]) inputs[i]!.value = newOtp[i] || "";
      if (newOtp[i] && i < length - 1) {
        inputs[i + 1]?.focus();
      }
    }
    setOtp(newOtp);
  };

  // handling delete + arrow keys
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      let newOtp = [...otp];
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
              ref={(input) => (inputs[index] = input)}
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
          Didn’t receive the OTP?{" "}
          <button className="text-yellow-600 font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
