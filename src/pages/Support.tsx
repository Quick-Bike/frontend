import React from "react";

const fadeInUpClasses = `opacity-0 translate-y-6 animate-fadeInUp animation-fill-forwards`;

export default function Support() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white dark:bg-gray-900 transition-colors p-4">
      {/* Heading and Business Hours */}
      <section
        className={`${fadeInUpClasses} animation-delay-100 max-w-3xl w-full pt-16 mb-14 text-center`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Get in touch with our creator-friendly
          <br />
          support team
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300">
          Our business hours are{" "}
          <span className="font-semibold">9AM–6PM ET Monday–Friday</span> and{" "}
          <span className="font-semibold">9AM–5PM ET on weekends</span>.
        </p>
      </section>

      {/* Support Options */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 px-4 w-full max-w-4xl justify-center">
        {[
          {
            title: "Chat support",
            desc: "Our support team is just a click away.",
            link: "#chat",
            linkText: "Chat now →",
            delay: "animation-delay-200",
          },
          {
            title: "Email support",
            desc: "Prefer to email? Send us an email and we’ll get back to you soon.",
            link: "mailto:support@yoursite.com",
            linkText: "Send email →",
            delay: "animation-delay-300",
          },
          {
            title: "Help center",
            desc: "Our self-serve help center is open 24/7 with 150+ articles to help.",
            link: "https://www.google.co.in/maps/place/Pahadi+Rides+%E2%80%93+Bike,+Bullet+%26+Scooty+Rentals+in+Pithoragarh/@29.583329,80.2070243,19.33z/data=!4m15!1m8!3m7!1s0x39a125c00088dd51:0x2b781d30a1523c63!2sPithoragarh,+Uttarakhand!3b1!8m2!3d29.5828604!4d80.2181884!16zL20vMDljX3R3!3m5!1s0x39a125cc58d61d9d:0x9a32f4ee2ebb392d!8m2!3d29.5832251!4d80.2071811!16s%2Fg%2F11ltnp30vg?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
            linkText: "Visit Help Center →",
            delay: "animation-delay-400",
          },
        ].map(({ title, desc, link, linkText, delay }) => (
          <div
            key={title}
            className={`${fadeInUpClasses} ${delay} flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow p-8 flex flex-col items-center`}
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="mb-5 text-gray-700 dark:text-gray-300 text-center">
              {desc}
            </p>
            <a
              href={link}
              target="_blank"
              className="text-purple-700 dark:text-purple-400 font-medium underline hover:no-underline transition"
            >
              {linkText}
            </a>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <section
        className={`${fadeInUpClasses} animation-delay-500 max-w-3xl w-full px-4 mb-10 text-center`}
      >
        <h3 className="text-sm uppercase tracking-wide mb-2 text-gray-500 dark:text-gray-400 font-medium">
          Our support team
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900 dark:text-gray-100">
          Talk to real people
        </h2>
        <p className="text-base md:text-lg mb-10 text-gray-700 dark:text-gray-300">
          Amazing customer support is the #1 reason our creators cite for
          choosing us. Our team is here to help you every step of the way.
        </p>
        {/* Team avatars */}
        <div className="flex justify-center gap-8">
          <img
            src="https://res.cloudinary.com/dumreogj3/image/upload/v1758366879/3551739_doqg3u.jpg"
            alt="Support Team 1"
            className="rounded-full w-16 h-16 object-cover border-4 border-white dark:border-gray-800 shadow"
          />
          <img
            src="https://res.cloudinary.com/dumreogj3/image/upload/v1758366879/3551739_doqg3u.jpg"
            alt="Support Team 2"
            className="rounded-full w-16 h-16 object-cover border-4 border-white dark:border-gray-800 shadow"
          />
          <img
            src="https://res.cloudinary.com/dumreogj3/image/upload/v1758366879/3551739_doqg3u.jpg"
            alt="Support Team 3"
            className="rounded-full w-16 h-16 object-cover border-4 border-white dark:border-gray-800 shadow"
          />
        </div>
      </section>

      {/* Tailwind custom animation styles */}
      {/* <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(1.5rem);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation-name: fadeInUp;
            animation-duration: 0.7s;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-fill-mode: forwards;
          }
          .animation-fill-forwards {
            animation-fill-mode: forwards;
          }
          .animation-delay-100 { animation-delay: 0.1s; }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-300 { animation-delay: 0.3s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-500 { animation-delay: 0.5s; }
        `}
      </style> */}
    </div>
  );
}
