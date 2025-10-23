import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sign_up from "./pages/Sign_up.tsx";
import Showing_Home from "./pages/Home_Page.tsx";
import ForgotPassword from "./pages/Forgot_Password.jsx";

import Otp_Page from "./pages/Otp_Page.tsx";
import { Provider } from "react-redux";
import TripStore from "./store/Trip_Reducer.tsx";
import Vehicle_Page from "./pages/Vehicle_Page.tsx";
import ShowAvailableBikes from "./pages/ShowAvailableBikes.tsx";
import BookingDetails from "./pages/BookingDetails.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyOrders from "./pages/MyOrders.tsx";
import Support from "./pages/Support.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import AboutUsPremium from "./pages/AboutUs.tsx";
const clientId = import.meta.env.VITE_CLIENT_ID;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Showing_Home /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Sign_up /> },
      { path: "/vehicle", element: <Vehicle_Page /> },
      { path: "/otp", element: <Otp_Page /> },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      { path: "available-vahicles", element: <ShowAvailableBikes /> },
      { path: "booking-details", element: <BookingDetails /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "support", element: <Support /> },
      { path: "terms/condition", element: <TermsAndConditions /> },
      { path: "privacy/policy", element: <PrivacyPolicy /> },
      { path: "about-us", element: <AboutUsPremium /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={TripStore}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
