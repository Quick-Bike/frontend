import { useState } from "react";
import EmptyBookingsPage from "./EmptyBookingsPage";

export default function MyOrders() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: "2025-09-05",
      time: "8:15 PM",
      pickupDate: "2025-09-05",
      dropoffDate: "2025-09-07",
      pickupTime: "9:00 AM",
      status: "Upcoming",
      bikeImage:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407217/classic_pgnsmc.png",
      bikeName: "Royal Enfield Classic 350",
    },
    {
      id: 2,
      date: "2025-09-06",
      time: "7:00 PM",
      pickupDate: "2025-09-06",
      dropoffDate: "2025-09-09",
      pickupTime: "10:30 AM",
      status: "Upcoming",
      bikeImage:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407531/AHunter_ro7dzw.png",
      bikeName: "Royal Enfield Hunter 350",
    },
    {
      id: 3,
      date: "2025-09-02",
      time: "10:30 AM",
      pickupDate: "2025-09-02",
      dropoffDate: "2025-09-03",
      pickupTime: "8:00 AM",
      status: "Completed",
      bikeImage:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407928/YNtorq_mazosu.png",
      bikeName: "Ntorq 125 ",
    },
  ]);

  const handleCancel = (id: number) =>
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );

  const sortedBookings = [...bookings].sort((a, b) => {
    if (a.status === "Upcoming" && b.status !== "Upcoming") return -1;
    if (a.status !== "Upcoming" && b.status === "Upcoming") return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div
      className={`md:min-h-screen bg-gray-50 dark:bg-gray-900 py-14 px-4 ${
        sortedBookings.length === 0 && "bg-white"
      }`}
    >
      {/* px-4 → 16px padding har side (mobile par bhi) */}
      {sortedBookings.length !== 0 && (
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-300 tracking-tight">
          My{" "}
          <span className="text-indigo-600 dark:text-yellow-600">Bookings</span>
        </h1>
      )}

      {sortedBookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          <EmptyBookingsPage />
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
          {sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 md:w-44 p-5">
                <img
                  src={booking.bikeImage}
                  alt={booking.bikeName}
                  className="w-40 h-28 object-contain "
                />
              </div>

              {/* Details */}
              <div className="flex-1 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-yellow-600">
                      {booking.bikeName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
                      Booked: {booking.date} at {booking.time}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Upcoming"
                        ? "bg-indigo-50 text-indigo-600 dark:bg-yellow-100 "
                        : booking.status === "Completed"
                        ? "bg-green-50 text-green-600 dark:bg-yellow-600 dark:text-gray-200"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Extra Info */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <div className="text-gray-900 dark:text-gray-400">
                    <span className="font-medium">🚚 Pickup:</span>{" "}
                    {booking.pickupDate} — {booking.pickupTime}
                  </div>
                  <div className="text-gray-900 dark:text-gray-400">
                    <span className="font-medium">🏁 Drop-off:</span>{" "}
                    {booking.dropoffDate}
                  </div>
                </div>

                {booking.status === "Upcoming" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="mt-6 inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
