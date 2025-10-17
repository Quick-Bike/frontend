// import React from "react";
import { Link } from "react-router-dom";

type AuthPopupProps = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export default function AuthPopup({ isOpen, onClose }: AuthPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm" />

      {/* Popup */}
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated Header */}
        <div className="relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/50 rounded-full animate-blob filter blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300/50 rounded-full animate-blob animation-delay-2000 filter blur-xl"></div>
          <div className="relative p-6 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
              Login or Sign-Up to Book your ride
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of happy riders!
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <Link
            to="/login"
            className="w-full flex justify-center py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition"
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="w-full flex justify-center py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
          <button
            onClick={() => onClose(false)}
            className="w-full py-2 text-center text-sm text-gray-500 dark:text-gray-400 hover:underline transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
