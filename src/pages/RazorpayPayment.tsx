import React, { useState } from "react";
import axios from "axios";

const RazorpayPayment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount) return alert("Please enter an amount");
    try {
      const { data } = await axios.post("http://localhost:8080/create-order", {
        amount: amount * 100,
        currency: "INR",
      });

      if (!data.success) return alert("Error creating order");
      const options = {
        key: "your_test_or_live_key_id",
        amount: amount * 100,
        currency: "INR",
        name: "Your Store",
        description: "Payment for order",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await axios.post(
            "http://localhost:8080/verify-payment",
            {
              orderId: data.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }
          );
          if (verifyRes.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: { color: "#528FF0" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Payment failed, try again.");
    }
  };

  return (
    <div>
      <h2>Razorpay Payment</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayPayment;
