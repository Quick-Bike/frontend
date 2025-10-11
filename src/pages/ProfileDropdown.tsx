"use client";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSliceACtion } from "../store/UserSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type User = {
  name: string;
  avatar?: string; // optional image URL
};

export default function ProfileDropdown() {
  // 👇 demo user
  // const user: User = { name: "Jyoti" /* avatar: "/user-avatar.png" */ };
  const user = useSelector((store) => store.user.userInfo);
  console.log("user", user);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstLetter = user.name.charAt(0).toUpperCase();
  const onClickLogoutHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/user/logout",
        {
          withCredentials: true,
        }
      );
      dispatch(userSliceACtion.clearUser());
      toast.info("Logged Out", { position: "top-right" });
      console.log("logout", res);
    } catch (err) {
      console.log("message", err.response?.data);
    }
  };
  return (
    <div className="relative flex gap-10 items-center md:block " ref={menuRef}>
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
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          firstLetter
        )}
      </button>
      {!open && <div className="md:hidden">{user.name}</div>}

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
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 rounded-full object-cover border  border-orange-300"
              />
            ) : (
              <div className="h-12 w-12 flex items-center justify-center rounded-full dark:bg-yellow-600 bg-gray-900  text-white text-lg font-semibold">
                {firstLetter}
              </div>
            )}
            <div>
              <p className="font-semibold dark:text-gray-300 text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Welcome back
              </p>
            </div>
            {/* Optional small logo/icon */}
            {/* <div className="ml-auto">
              <img src="newLogo.jpg" alt="Logo" className="h-20 w-20" />
            </div> */}
          </div>

          {/* Menu Items */}
          <ul className="py-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>
              <Link
                to="/my-orders"
                className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons text-orange-500"></span>
                My Bookings
              </Link>
            </li>
            <li>
              {/* <a
                href="/my-coins"
                className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50"
              > */}
              <span className="material-icons text-orange-500"> </span>
              <div className="flex items-center gap-2 px-6 py-2 hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer">
                My Coins : 0
              </div>
              {/* </a> */}
            </li>
            <li>
              <button
                onClick={() => onClickLogoutHandler()}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <span className="material-icons text-orange-500"></span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
