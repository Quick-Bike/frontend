import { useNavigate } from "react-router-dom"; // Recommended way

export default function EmptyBookingsPage() {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    navigate("/vehicle"); // React Router navigation
  };

  return (
    <div className="md:flex flex-col items-center justify-center md:min-h-screen min-h-0 bg-white dark:bg-gray-900 text-center p-6">
      <h1 className="text-3xl font-bold text-gray-500 mb-6 dark:text-yellow-600">
        You have no Bookings
      </h1>

      <div className="mb-6">
        <img
          src="https://res.cloudinary.com/dumreogj3/image/upload/v1758093257/EmptyOrder-removebg-preview_ag7lso.png"
          alt="Clipboard Checklist Illustration"
          className="mx-auto w-48 sm:w-64 md:w-96 lg:w-[450px] dark:bg-gray-500 dark:text-gray-300 rounded-lg"
        />
      </div>

      <p className="text-gray-600 text-lg mb-8">
        We can help you change that.
        <br />
        Tap Search Vehicle and find a suitable ride for you.
      </p>

      <button
        onClick={goToSearchPage}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition"
      >
        Search Vehicle
      </button>
    </div>
  );
}
