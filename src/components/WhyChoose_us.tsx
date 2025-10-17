import { useEffect, useRef } from "react";
import {
  FaMotorcycle,
  FaRupeeSign,
  FaTools,
  FaMousePointer,
  FaCalendarAlt,
  FaLifeRing,
} from "react-icons/fa";

export default function WhyChoose_us() {
  const features = [
    {
      icon: <FaMotorcycle className="text-orange-500 text-3xl" />,
      title: "Wide Range of Vehicles",
      desc: "Choose from scooties, commuter bikes, and premium rides.",
    },
    {
      icon: <FaRupeeSign className="text-orange-500 text-3xl" />,
      title: "Affordable Pricing",
      desc: "Transparent daily and hourly rates, no hidden fees.",
    },
    {
      icon: <FaTools className="text-orange-500 text-3xl" />,
      title: "Well-Maintained Fleet",
      desc: "Regular servicing ensures safety & comfort.",
    },
    {
      icon: <FaMousePointer className="text-orange-500 text-3xl" />,
      title: "Quick & Easy Booking",
      desc: "Book online in a few clicks, instant confirmation.",
    },
    {
      icon: <FaCalendarAlt className="text-orange-500 text-3xl" />,
      title: "Flexible Plans",
      desc: "Hourly, daily, and long-term rentals available.",
    },
    {
      icon: <FaLifeRing className="text-orange-500 text-3xl" />,
      title: "24/7 Roadside Support",
      desc: "Assistance whenever you need it.",
    },
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [features.length]);

  return (
    <>
      <style>{`
        .card {
          opacity: 0;
          transform: translateX(0);
          transition: opacity 0.6s ease, transform 1.5s ease;
        }
        .card.from-left {
          transform: translateX(-50px);
        }
        .card.from-right {
          transform: translateX(50px);
        }
        .card.visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-yellow-600 sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Making your ride safe, simple, and affordable.
          </p>
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-2">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={(el) => setCardRef(el, idx)}
              className={`card group rounded-xl border border-gray-100 dark:border-gray-500 shadow-sm p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${
                idx % 2 === 0 ? "from-left" : "from-right"
              }`}
            >
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-50">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
