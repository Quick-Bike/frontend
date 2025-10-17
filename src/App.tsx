import "./App.css";
import Header from "./components/Header";
import useDarkmode from "./hooks/useDarkmode";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FetchingAllData from "./hooks/FetchingAllData";
function App() {
  useDarkmode();
  return (
    <>
      <div className="transition-colors duration-500">
        <FetchingAllData />
        <ScrollRestoration />
        <ToastContainer />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
