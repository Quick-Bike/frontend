import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function BookingDetails() {
  // const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const vehicle = location.state.v;
  const time = location.state.time;
  // ---- amounts ----
  const baseRental = vehicle.price - 120; // rental incl. taxes
  const gst = 60; // 5%
  const sgst = 30; // 2.5%
  const cgst = 30; // 2.5%
  const securityDeposit = vehicle.security;
  const totalPayable = vehicle.price + securityDeposit;
  const advancePayable = Math.round(totalPayable * 0.3);
  const remainingAmount = totalPayable - advancePayable;
  const paymentHandler = async () => {
    const { data: orderData } = await axios.post(
      "http://localhost:5000/order/create-razorpay-order",
      { amount: advancePayable * 100 },
      { withCredentials: true }
    );
    console.log("res", orderData);
    const { data: key_id } = await axios.get(
      "http://localhost:5000/order/get/key"
    );
    console.log("key", key_id);
    const order = {
      dummyData: "hi",
    };
    const payload = encodeURIComponent(JSON.stringify(order));
    // const id = "jlksdf23";
    const options = {
      key: key_id.key, // Replace with your Razorpay key_id
      amount: orderData.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Ride With Us",
      description: "Rent pay advance 30%",
      order_id: orderData.order.id, // This is the order_id created in the backend
      callback_url: `http://localhost:5000/order/verify-payment?order=${payload}`, // Your success URL
      prefill: {
        name: user.name,
        email: user.email,
        contact: "00000000000",
      },
      method: {
        netbanking: false,
        card: true,
        upi: true,
        wallet: false,
        emi: false,
        paylater: false,
        // leave only card and upi as true, others as false
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:white  flex flex-col items-center p-6">
      {/* Step Progress */}
      <div className="flex items-center justify-center mb-8 text-gray-600 text-sm">
        <span className="font-medium text-gray-400">Select Vehicle</span>
        <div className="w-10 border-t-2 border-gray-300 mx-2"></div>
        <span className="font-semibold text-blue-600 dark:text-yellow-600">
          Booking Details
        </span>
        <div className="w-10 border-t-2 border-gray-300 mx-2"></div>
        <span className="font-medium text-gray-400">Payment</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl items-stretch">
        {/* Left Card */}
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-800  shadow rounded-2xl p-6">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-60 mx-auto mb-4 object-contain"
          />
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-yellow-600">
            {vehicle.name}
          </h2>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span>🏍️ {vehicle.cc}</span>
            <span>⛽ {vehicle.mileage}</span>
            <span>⚙️ {vehicle.gear}</span>
          </div>

          <div className="pt-4 mb-4 ">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Booking Duration
            </h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              {/* 📅 Friday, 05 Sep 10:00 AM → Sunday, 07 Sep 10:00 AM */}
              📅 {time.pickUpDate} {time.pickUpTime} → {time.dropOffDate}{" "}
              {time.dropOffTime}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-semibold text-gray-700 mb-2 dark:text-gray-300">
              Add-ons
            </h3>
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <input type="checkbox" checked readOnly className="rounded" />{" "}
              Helmet
            </label>
          </div>

          <div className="mt-6 flex gap-6 text-sm text-gray-500 dark:text-gray-300">
            <span>✔️ Verified Vehicle</span>
            <span>✔️ 24/7 Support</span>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-yellow-600 mb-4">
            Payment Summary
          </h2>

          {/* Rental & Tax Detail */}
          <div className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Rental Cost</span>
              <span className="font-medium">₹{baseRental}</span>
            </div>
            <div className="ml-4 text-gray-500 dark:text-gray-300">
              <div>Includes taxes:</div>
              <div className="flex justify-between ml-4">
                <span>GST (5%)</span> <span>₹{gst}</span>
              </div>
              <div className="flex justify-between ml-4">
                <span>SGST (2.5%)</span> <span>₹{sgst}</span>
              </div>
              <div className="flex justify-between ml-4">
                <span>CGST (2.5%)</span> <span>₹{cgst}</span>
              </div>
            </div>
            <div className="flex flex-col pt-2 text-red-500">
              <span>
                A refundable security deposit will be applied to your chosen
                vehicle. This deposit is 100% refundable after your trip.
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-semibold text-green-700">
                Advance due now (30%)
              </span>
              <span className="font-semibold text-green-700">
                ₹{advancePayable}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-300 text-xs">
                Remaining (due later)
              </span>
              <span className="text-gray-500 dark:text-gray-300 text-xs">
                ₹{remainingAmount}
              </span>
            </div>
          </div>

          <div className="my-3 h-px bg-gray-200"></div>

          {/* Total */}
          <div className="bg-gray-50 dark:bg-gray-300 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800 ">Total Amount</p>
              <p className="text-xs text-gray-500">
                30% payable now, balance due later. <br />
                Security deposit of ₹{securityDeposit} is fully refundable after
                your trip.
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">₹{totalPayable}</p>
          </div>

          {/* Cancellation Policy */}
          <div className="mt-4 bg-yellow-50 text-yellow-700 rounded-lg p-3 text-sm flex gap-2">
            ⚠️{" "}
            <span>
              Cancellation Policy: 20% of rental cost (₹
              {Math.round(baseRental * 0.2)}) will be deducted if booking is
              cancelled.
            </span>
          </div>

          {/* Info line */}
          <p className="text-xs text-gray-500 dark:text-yellow-600 text-center mt-3">
            🔒 Secure Payment • 100% Safe & Encrypted
          </p>

          {/* Button */}
          <div className="mt-auto">
            <button
              onClick={() => paymentHandler()}
              className="w-full py-3 bg-orange-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 hover:bg-orange-600 text-white font-semibold rounded-lg shadow mt-2"
            >
              Pay ₹{advancePayable} Now (30% Advance)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
