import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

interface Testimonial {
  username: string;
  feedback: string;
  avatar?: string; // optional if you decide to use
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

// Testimonial Card component
function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div
      className={`flex flex-col items-center px-8 py-10 rounded-3xl bg-white dark:bg-gray-800 shadow-lg transition-transform duration-700 ease-in-out ${
        isActive
          ? "scale-105 border-yellow-400 border-4 opacity-100 z-20"
          : "scale-90 opacity-50 border-transparent z-10 pointer-events-none select-none"
      } w-full max-w-md`}
      style={{ willChange: "transform, opacity" }}
    >
      <img
        src="https://res.cloudinary.com/dumreogj3/image/upload/v1758366879/3551739_doqg3u.jpg"
        alt={testimonial.username}
        loading="lazy"
        className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md mb-8 object-cover"
      />
      <p className="italic text-center text-lg mb-8 font-serif text-gray-700 dark:text-gray-200 leading-relaxed">
        "{testimonial.feedback}"
      </p>
      <div className="font-bold text-2xl text-yellow-600 dark:text-yellow-400 mb-1">
        {testimonial.username}
      </div>
      <div className="text-sm text-gray-400 dark:text-gray-500">
        Verified User
      </div>
    </div>
  );
}

const CustomerReview: React.FC = () => {
  const [feedback, setFeedback] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Replace "hi" with your real API endpoint string
        const res = await axiosInstance.get<Testimonial[]>(
          "/api/get/users/feedback"
        );
        setFeedback(res.data || []);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (feedback.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedback.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [feedback.length]);

  const prevCard = () =>
    setCurrent((prev) => (prev - 1 + feedback.length) % feedback.length);
  const nextCard = () => setCurrent((prev) => (prev + 1) % feedback.length);

  const prevIdx = (current - 1 + feedback.length) % feedback.length;
  const nextIdx = (current + 1) % feedback.length;

  const maxDots = 7;
  const total = feedback.length;

  const getVisibleDots = (): (
    | number
    | "left-ellipsis"
    | "right-ellipsis"
  )[] => {
    if (total <= maxDots) return feedback.map((_, i) => i);

    const dots: (number | "left-ellipsis" | "right-ellipsis")[] = [];
    const left = Math.max(1, current - 2);
    const right = Math.min(total - 2, current + 2);

    dots.push(0);

    if (left > 1) dots.push("left-ellipsis");

    for (let i = left; i <= right; i++) dots.push(i);

    if (right < total - 2) dots.push("right-ellipsis");

    dots.push(total - 1);

    return dots;
  };

  const visibleDots = getVisibleDots();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full dark:bg-gray-900 py-14 px-4 sm:px-6">
      <h2 className="text-center text-[2.7rem] sm:text-[3rem] md:text-[4rem] font-bold mb-12 text-yellow-700 dark:text-yellow-400 font-serif drop-shadow-xl">
        What Our Customers Say
      </h2>

      <div className="flex justify-center items-center gap-8 mb-12 w-full max-w-6xl relative">
        {feedback.length > 2 && (
          <div className="hidden md:block flex-1 flex justify-center">
            <TestimonialCard testimonial={feedback[prevIdx]} isActive={false} />
          </div>
        )}

        {feedback.length > 0 && (
          <div className="flex-1 flex justify-center z-30">
            <TestimonialCard testimonial={feedback[current]} isActive={true} />
          </div>
        )}

        {feedback.length > 2 && (
          <div className="hidden md:block flex-1 flex justify-center">
            <TestimonialCard testimonial={feedback[nextIdx]} isActive={false} />
          </div>
        )}
      </div>

      <div className="flex gap-10 mb-10 justify-center">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-full shadow-md text-lg transition"
          onClick={prevCard}
          aria-label="Previous testimonial"
        >
          ← Prev
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-full shadow-md text-lg transition"
          onClick={nextCard}
          aria-label="Next testimonial"
        >
          Next →
        </button>
      </div>

      <div className="flex gap-4 mb-2 flex-wrap justify-center max-w-md">
        {visibleDots.map((dot, idx) =>
          dot === "left-ellipsis" || dot === "right-ellipsis" ? (
            <span
              key={idx}
              className="text-yellow-400 mx-1 select-none text-2xl"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={idx}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${
                current === dot
                  ? "bg-yellow-400 shadow-xl scale-125"
                  : "bg-yellow-700 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrent(dot)}
              aria-label={`Go to testimonial ${dot + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CustomerReview;
