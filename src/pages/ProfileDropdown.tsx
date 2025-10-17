import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/selectorHook"; // your typed hooks
import { userSliceActions } from "../store/UserSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function ProfileDropdown() {
  const user = useAppSelector((state) => state.user.userInfo);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return null; // or loading state if user data is async
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  const onClickLogoutHandler = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/user/logout", {
        withCredentials: true,
      });
      dispatch(userSliceActions.clearUser());
      toast.info("Logged Out", { position: "top-right" });
      console.log("logout", res);
    } catch (err: any) {
      console.log("message", err.response?.data);
    }
  };

  return (
    <div className="relative flex gap-10 items-center md:block" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-center
          h-10 w-10 rounded-full
          bg-amber-500 text-white font-semibold
          dark:bg-yellow-600
          hover:bg-amber-600
          dark:hover:bg-yellow-700
          focus:outline-none focus:ring-2 focus:ring-gray-400
          transition
        "
      >
        {firstLetter}
      </button>
      {!open && (
        <div className="md:hidden truncate max-w-[160px] sm:break-words sm:max-w-none">
          {user.name}
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div
          className="
            left-0
            top-9
            md:top-auto
            md:left-auto
            absolute md:right-0 mt-2
            w-60 sm:w-64
            dark:bg-gray-900
            dark:text-white
            rounded-xl border border-orange-200
            dark:border-gray-600
            bg-white shadow-lg
            animate-fade-in
            z-50
          "
        >
          {/* Top user box */}
          <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 border-gray-400">
            <div className="h-12 w-12 flex items-center justify-center rounded-full dark:bg-yellow-600 bg-gray-900 text-white text-lg font-semibold">
              {firstLetter}
            </div>

            <div>
              <p className="font-semibold dark:text-gray-300 text-gray-800 truncate max-w-[160px] sm:break-words sm:max-w-none">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Welcome back
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="py-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>
              <Link
                to="/my-orders"
                className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-800"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <div className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer">
                My Coins : {user.myCoin}
              </div>
            </li>
            <li>
              <button
                onClick={() => onClickLogoutHandler()}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
