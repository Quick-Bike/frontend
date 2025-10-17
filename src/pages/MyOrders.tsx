import { useMemo } from "react";
// import { useDispatch } from "react-redux";
import EmptyBookingsPage from "./EmptyBookingsPage";
import { useAppSelector } from "../hooks/selectorHook";

interface Vehicle {
  _id: string;
  name: string;
  image: string;
}

interface Booking {
  _id: string;
  razorpayOrderId: string;
  orderStatus: "confirmed" | "pending" | "completed";
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  orderDate: string; // ISO date string of order creation
  vehicle: Vehicle;
}

export default function MyOrders() {
  // const dispatch = useDispatch();-
  // const bookings = useSelector(
  //   (state) => state.user.userInfo.myOrders
  // ) as Booking[];
  const bookings = useAppSelector(
    (state) => state.user.userInfo?.myOrders
  ) as Booking[];
  console.log("howare", bookings);
  const sortedBookings = useMemo(() => {
    const statusPriority = (status: Booking["orderStatus"]) =>
      status === "confirmed" ? 0 : status === "pending" ? 1 : 2;

    return [...bookings].sort((a, b) => {
      const pa = statusPriority(a.orderStatus);
      const pb = statusPriority(b.orderStatus);
      if (pa !== pb) return pa - pb;

      // For confirmed and pending, sort by orderDate descending
      const da = new Date(a.orderDate).getTime();
      const db = new Date(b.orderDate).getTime();
      return db - da;
    });
  }, [bookings]);

  const handleCancel = (orderId: string) => {
    console.log("cancelled", orderId);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  if (sortedBookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <EmptyBookingsPage />
      </div>
    );
  }
  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-300">
        My{" "}
        <span className="text-indigo-600 dark:text-yellow-600">Bookings</span>
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        {sortedBookings.map((booking) => {
          const puDate = formatDate(booking.pickUpDate);
          const doDate = formatDate(booking.dropOffDate);
          const odDate = formatDate(booking.orderDate);
          const date = new Date(booking.orderDate);
          const timeString = `${pad(date.getHours())}:${pad(
            date.getMinutes()
          )}:${pad(date.getSeconds())}`;
          return (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 md:w-44 p-5">
                <img
                  src={booking.vehicle.image}
                  alt={booking.vehicle.name}
                  className="w-40 h-28 object-contain"
                />
              </div>
              <div className="flex-1 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-yellow-600">
                      {booking.vehicle.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
                      Order Date: {odDate} at {timeString}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.orderStatus === "confirmed"
                        ? "bg-green-50 text-green-600 dark:bg-green-800 dark:text-green-200"
                        : booking.orderStatus === "pending"
                        ? "bg-indigo-50 text-indigo-600 dark:bg-yellow-100"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {booking.orderStatus.charAt(0).toUpperCase() +
                      booking.orderStatus.slice(1)}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <div className="text-gray-900 dark:text-gray-400">
                    <span className="font-medium">🚚 Pickup:</span> {puDate} —{" "}
                    {booking.pickUpTime}
                  </div>
                  <div className="text-gray-900 dark:text-gray-400">
                    <span className="font-medium">🏁 Drop-off:</span> {doDate} —{" "}
                    {booking.dropOffTime}
                  </div>
                </div>
                {booking.orderStatus !== "completed" && (
                  <button
                    onClick={() => handleCancel(booking.razorpayOrderId)}
                    className="mt-6 inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
