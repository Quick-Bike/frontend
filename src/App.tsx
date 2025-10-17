import "./App.css";
import Header from "./components/Header";
import useDarkmode from "./hooks/useDarkmode";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FetchingAllData from "./hooks/FetchingAllData";
<<<<<<< HEAD
=======


>>>>>>> 099eff20454114a4a9bbc78caa5d95cb82511c77
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
