import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

// Testimonial Card component (reused with minor animation tweaks)
function TestimonialCard({ testimonial, isActive }) {
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
        // src={testimonial.avatar}
        // src="https://res.cloudinary.com/dumreogj3/image/upload/v1758366464/8c913261-3088-406d-b6f9-3a192929f83c_corxls.png"
        // src="Male1.jpg"
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

const CustomerReview = () => {
  const [feedback, setFeedback] = useState([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // Fetch feedback from backend (consider paginated API for large data)
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/get/users/feedback"
        );
        setFeedback(res.data || []);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  // Autoplay carousel every 3500ms
  useEffect(() => {
    if (feedback.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedback.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [feedback.length]);

  // Prev/Next handlers
  const prevCard = () =>
    setCurrent((prev) => (prev - 1 + feedback.length) % feedback.length);
  const nextCard = () => setCurrent((prev) => (prev + 1) % feedback.length);

  // Calculate indexes for prev, current, next cards
  const prevIdx = (current - 1 + feedback.length) % feedback.length;
  const nextIdx = (current + 1) % feedback.length;

  // Dot navigation optimization: show max 7 dots, with ellipsis if many
  const maxDots = 7;
  const total = feedback.length;

  const getVisibleDots = () => {
    if (total <= maxDots) return feedback.map((_, i) => i);

    const dots = [];
    const left = Math.max(1, current - 2);
    const right = Math.min(total - 2, current + 2);

    dots.push(0); // first dot always

    if (left > 1) dots.push("left-ellipsis");

    for (let i = left; i <= right; i++) dots.push(i);

    if (right < total - 2) dots.push("right-ellipsis");

    dots.push(total - 1); // last dot always

    return dots;
  };

  const visibleDots = getVisibleDots();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br  dark:from-[#181c2b] dark:to-[#8f5625] py-14 px-4 sm:px-6">
      {/* Header */}
      <h2 className="text-center text-[2.7rem] sm:text-[3rem] md:text-[4rem] font-bold mb-12 text-yellow-700 dark:text-yellow-400 font-serif drop-shadow-xl">
        What Our Customers Say
      </h2>

      {/* Carousel container */}
      <div className="flex justify-center items-center gap-8 mb-12 w-full max-w-6xl relative">
        {/* Prev card (desktop only) */}
        {feedback.length > 2 && (
          <div className="hidden md:block flex-1 flex justify-center">
            <TestimonialCard testimonial={feedback[prevIdx]} isActive={false} />
          </div>
        )}

        {/* Current card */}
        {feedback.length > 0 && (
          <div className="flex-1 flex justify-center z-30">
            <TestimonialCard testimonial={feedback[current]} isActive={true} />
          </div>
        )}

        {/* Next card (desktop only) */}
        {feedback.length > 2 && (
          <div className="hidden md:block flex-1 flex justify-center">
            <TestimonialCard testimonial={feedback[nextIdx]} isActive={false} />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
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

      {/* Dot Navigation */}
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { GrFormPrevious } from "react-icons/gr";
// import { MdOutlineNavigateNext } from "react-icons/md";

// const TOTAL_PAGES = 4;

// const CustomerReview = () => {
//   const [feedback, setFeedback] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [fade, setFade] = useState(false);
//   const [prefetchCache, setPrefetchCache] = useState<Record<number, any[]>>({});

//   // Fetch data for current page with fade effect
//   useEffect(() => {
//     let isMounted = true;
//     setFade(false);
//     const timer = setTimeout(() => {
//       setLoading(true);
//       if (prefetchCache[page]) {
//         if (isMounted) {
//           setFeedback(prefetchCache[page]);
//           setLoading(false);
//           setFade(true);
//         }
//       } else {
//         axios
//           .get(`http://localhost:5000/api/get/users/feedback?page=${page}`)
//           .then((res) => {
//             if (isMounted) {
//               setFeedback(res.data);
//               setLoading(false);
//               setFade(true);
//               setPrefetchCache((prev) => ({ ...prev, [page]: res.data }));
//             }
//           })
//           .catch(() => {
//             if (isMounted) setLoading(false);
//           });
//       }
//     }, 200);
//     return () => {
//       isMounted = false;
//       clearTimeout(timer);
//     };
//   }, [page, prefetchCache]);

//   // Prefetch next page for smooth experience
//   useEffect(() => {
//     const nextPage = page + 1;
//     if (nextPage <= TOTAL_PAGES && !prefetchCache[nextPage]) {
//       axios
//         .get(`http://localhost:5000/api/get/users/feedback?page=${nextPage}`)
//         .then((res) => {
//           setPrefetchCache((prev) => ({ ...prev, [nextPage]: res.data }));
//         })
//         .catch(() => {});
//     }
//   }, [page, prefetchCache]);

//   function getPaginationPages(
//     current: number,
//     total: number,
//     maxPagesToShow = 7
//   ) {
//     const pages = [];
//     if (total <= maxPagesToShow) {
//       for (let i = 1; i <= total; i++) pages.push(i);
//     } else {
//       const left = Math.max(2, current - 2);
//       const right = Math.min(total - 1, current + 2);
//       pages.push(1);
//       if (left > 2) pages.push("left-ellipsis");
//       for (let i = left; i <= right; i++) pages.push(i);
//       if (right < total - 1) pages.push("right-ellipsis");
//       pages.push(total);
//     }
//     return pages;
//   }
//   const pageNumbers = getPaginationPages(page, TOTAL_PAGES);

//   // Helpers for prev and next indexes in feedback array
//   const prevIndex = (idx: number) =>
//     idx === 0 ? feedback.length - 1 : idx - 1;
//   const nextIndex = (idx: number) =>
//     idx === feedback.length - 1 ? 0 : idx + 1;

//   return (
//     <div>
//       {loading ? (
//         <div className="text-center py-10">
//           <div className="loader mx-auto mb-2" />
//           <p className="text-gray-500 italic">Loading...</p>
//         </div>
//       ) : (
//         <section className="py-12 dark:bg-gray-900 dark:text-white">
//           <h2 className="text-center text-3xl font-semibold text-gray-800 mb-12 dark:text-yellow-600">
//             What Our Customers Say
//           </h2>

//           <div
//             className={`w-full max-w-7xl mx-auto flex justify-center items-center gap-8 px-4 transition-opacity duration-500 ${
//               fade ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {/* Previous card (hidden on small screens) */}
//             {feedback.length > 2 && (
//               <div className="hidden md:flex flex-1 max-w-sm justify-end opacity-70 scale-95 pointer-events-none select-none">
//                 <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
//                   <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
//                   <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
//                     "
//                     {feedback.length > 0 ? feedback[prevIndex(0)].feedback : ""}
//                     "
//                   </p>
//                   <img
//                     className="w-12 h-12 rounded-full mb-3 border-2 border-yellow-400"
//                     src={
//                       feedback.length > 0
//                         ? feedback[prevIndex(0)].avatar
//                         : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     }
//                     alt={
//                       feedback.length > 0
//                         ? feedback[prevIndex(0)].username
//                         : "User"
//                     }
//                   />
//                   <div className="font-semibold text-yellow-600 dark:text-yellow-400">
//                     {feedback.length > 0 ? feedback[prevIndex(0)].username : ""}
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     Verified User
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Active card */}
//             {feedback.length > 0 && (
//               <div className="flex-1 max-w-lg w-full mx-auto bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl border-4 border-yellow-400 flex flex-col items-center text-center">
//                 <div className="text-yellow-400 mb-5 text-2xl">⭐⭐⭐⭐⭐</div>
//                 <p className="text-gray-700 dark:text-gray-300 mb-8 italic font-serif text-lg leading-relaxed">
//                   "{feedback[0].feedback}"
//                 </p>
//                 <img
//                   className="w-16 h-16 rounded-full mb-6 border-4 border-yellow-400"
//                   src={feedback[0].avatar}
//                   alt={feedback[0].username}
//                 />
//                 <div className="font-bold text-yellow-600 dark:text-yellow-400 text-2xl mb-1">
//                   {feedback[0].username}
//                 </div>
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   Verified User
//                 </div>
//               </div>
//             )}

//             {/* Next card (hidden on small screens) */}
//             {feedback.length > 2 && (
//               <div className="hidden md:flex flex-1 max-w-sm justify-start opacity-70 scale-95 pointer-events-none select-none">
//                 <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
//                   <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
//                   <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
//                     "
//                     {feedback.length > 0 ? feedback[nextIndex(0)].feedback : ""}
//                     "
//                   </p>
//                   <img
//                     className="w-12 h-12 rounded-full mb-3 border-2 border-yellow-400"
//                     src={
//                       feedback.length > 0
//                         ? feedback[nextIndex(0)].avatar
//                         : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     }
//                     alt={
//                       feedback.length > 0
//                         ? feedback[nextIndex(0)].username
//                         : "User"
//                     }
//                   />
//                   <div className="font-semibold text-yellow-600 dark:text-yellow-400">
//                     {feedback.length > 0 ? feedback[nextIndex(0)].username : ""}
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     Verified User
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Pagination buttons */}
//           <div className="flex justify-center items-center gap-4 mt-10">
//             <button
//               aria-label="Previous page"
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className={`px-4 py-2 rounded-md border flex justify-center items-center font-semibold transition-colors ${
//                 page === 1
//                   ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-400 dark:text-yellow-300 border-yellow-300 cursor-not-allowed"
//                   : "bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 border-yellow-400"
//               }`}
//             >
//               <GrFormPrevious size={22} /> Prev
//             </button>

//             {pageNumbers.map((p, idx) =>
//               p === "left-ellipsis" || p === "right-ellipsis" ? (
//                 <span key={idx} className="text-yellow-400 mx-2 select-none">
//                   &hellip;
//                 </span>
//               ) : (
//                 <button
//                   key={idx}
//                   onClick={() => setPage(p as number)}
//                   className={`px-4 py-2 rounded-md border font-semibold ${
//                     page === p
//                       ? "bg-yellow-600 dark:bg-yellow-700 text-white border-yellow-600 dark:border-yellow-700"
//                       : "bg-white hover:bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 border-yellow-400"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               )
//             )}

//             <button
//               aria-label="Next page"
//               disabled={page === TOTAL_PAGES}
//               onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
//               className={`px-4 py-2 rounded-md border flex justify-center items-center font-semibold transition-colors ${
//                 page === TOTAL_PAGES
//                   ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-400 dark:text-yellow-300 border-yellow-300 cursor-not-allowed"
//                   : "bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 border-yellow-400"
//               }`}
//             >
//               Next <MdOutlineNavigateNext size={22} />
//             </button>
//           </div>
//         </section>
//       )}

//       {/* Call to action */}
//       <section className="bg-gray-800 text-white py-12 dark:bg-gray-900">
//         <div className="max-w-3xl mx-auto text-center px-4">
//           <h2 className="text-2xl font-bold mb-4">Ready to Hit the Road?</h2>
//           <p className="text-gray-300 mb-6">
//             Join thousands of satisfied customers who trust BookMyBike for their
//             rental needs. Book your perfect ride today!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="vehicle"
//               className="px-6 py-3 border border-gray-400 text-gray-400 font-semibold rounded-lg shadow hover:bg-gray-700 transition flex items-center justify-center gap-2"
//             >
//               🔍 Browse Vehicles
//             </Link>
//             <a
//               href="tel:+917536018155"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-6 py-3 font-semibold rounded-lg shadow hover:bg-yellow-700 transition flex items-center bg-yellow-600 justify-center gap-2"
//             >
//               📞 Call Us Now
//             </a>
//           </div>
//         </div>
//       </section>

//       <style>{`
//         .loader {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #fbbf24;
//           border-radius: 50%;
//           width: 36px;
//           height: 36px;
//           animation: spin 1s linear infinite;
//           margin: 0 auto;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg);}
//           100% { transform: rotate(360deg);}
//         }
//       `}</style>
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";

// // Sample testimonials data
// const testimonials = [
//   {
//     username: "Sarah",
//     feedback:
//       "An incredibly easy process and amazing bikes. Highly recommended!",
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=256&q=80",
//   },
//   {
//     username: "John",
//     feedback: "Service was quick, transparent, and the staff was friendly!",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     username: "Priya",
//     feedback: "Loved the website design, booking was so easy.",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     username: "Michael",
//     feedback: "Top-notch experience with great bikes!",
//     avatar: "https://randomuser.me/api/portraits/men/44.jpg",
//   },
// ];

// // Testimonial Card component
// function TestimonialCard({ testimonial, isActive }) {
//   return (
//     <div
//       className={`flex flex-col items-center px-8 py-10 rounded-3xl bg-white dark:bg-gray-800 shadow-lg transition-transform duration-500 ease-in-out ${
//         isActive
//           ? "scale-105 border-yellow-400 border-4"
//           : "scale-95 opacity-70 border-transparent"
//       } w-full`}
//     >
//       <img
//         src={testimonial.avatar}
//         alt={testimonial.username}
//         loading="lazy"
//         className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md mb-8"
//       />
//       <p className="italic text-center text-lg mb-8 font-serif text-gray-700 dark:text-gray-200 leading-relaxed">
//         "{testimonial.feedback}"
//       </p>
//       <div className="font-bold text-2xl text-yellow-600 dark:text-yellow-400 mb-1">
//         {testimonial.username}
//       </div>
//       <div className="text-sm text-gray-400 dark:text-gray-500">
//         Verified User
//       </div>
//     </div>
//   );
// }
