import React, { useState, useRef, useEffect } from "react";

const OurFleet = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const items = [
    {
      type: "Sports Bike",
      desc: "High-performance bikes for thrill seekers",
      price: "1000",
      image:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407813/RApache_o90log.png",
    },
    {
      type: "City Scooters",
      desc: "Perfect for daily commute and city rides",
      price: "800",
      image:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407928/YNtorq_mazosu.png",
    },
    {
      type: "Cruiser Bike",
      desc: "Comfortable rides for long journeys",
      price: "1200",
      image:
        "https://res.cloudinary.com/dumreogj3/image/upload/v1757407217/classic_pgnsmc.png",
    },
  ];
  // Auto-rotate feature showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  // Intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking for parallax effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white bg-gradient-to-br  dark:from-slate-900 dark:via-gray-900 dark:to-black transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      {/* Theme-aware animated background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-40">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 dark:from-yellow-400/30 dark:to-orange-500/30 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${
              mousePosition.y * 0.5
            }px)`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-600/30 to-amber-500/30 dark:from-yellow-600/30 dark:to-amber-500/30 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${
              mousePosition.y * -0.3
            }px)`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-500/20 dark:from-orange-400/20 dark:to-red-500/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Theme-aware particle effect overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-600 dark:bg-yellow-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-8 py-20">
        {/* Enhanced Theme-Aware Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-600 dark:from-yellow-300 dark:via-yellow-500 dark:to-orange-600 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-2xl animate-gradient-x">
            Our Fleet
          </h1>
          <div className="w-40 h-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-400 dark:via-orange-500 dark:to-red-500 mx-auto mb-8 rounded-full shadow-lg animate-pulse"></div>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto font-light leading-relaxed tracking-wide">
            Step into the future of mobility with our premium, cutting-edge
            collection
          </p>

          {/* Theme-aware stats section */}
          <div className="flex justify-center gap-8 md:gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                Vehicles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
                5★
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                Rated
              </div>
            </div>
          </div>
        </div>

        {/* Premium Theme-Aware Featured Showcase */}
        <div
          className={`max-w-7xl mx-auto mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-800/60 backdrop-blur-2xl border border-gray-300/50 dark:border-gray-600/30 shadow-2xl">
            <img
              src={items[activeCard]?.image}
              alt={items[activeCard]?.type}
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-70 transition-all duration-1000"
            />

            {/* Theme-aware overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-white/70 dark:from-black/80 dark:via-transparent dark:to-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-black/60 dark:via-transparent dark:to-transparent"></div>

            {/* Enhanced theme-aware content */}
            <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-16">
              <div className="text-gray-900 dark:text-white max-w-2xl">
                <div className="inline-block px-4 py-1 bg-yellow-500/20 dark:bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-700 dark:text-yellow-400 text-sm font-semibold mb-4 border border-yellow-500/30 dark:border-yellow-400/30">
                  FEATURED
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-orange-600 dark:from-yellow-300 dark:to-orange-400 drop-shadow-lg">
                  {items[activeCard]?.type}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-200 leading-relaxed font-light">
                  {items[activeCard]?.desc}
                </p>

                <div className="flex items-center gap-6 md:gap-8 mb-8 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-yellow-600 dark:text-yellow-400">
                      ₹{items[activeCard]?.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-xl">
                      /day
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-500 text-white dark:text-black font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-500/25 flex items-center gap-2">
                    <span>Book Now</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                  <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-600 dark:border-yellow-400 text-yellow-700 dark:text-yellow-400 font-bold rounded-full hover:bg-yellow-600 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Enhanced theme-aware bike showcase */}
              <div className="hidden lg:block relative">
                <div className="w-80 md:w-96 h-80 md:h-96 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 dark:from-yellow-400/20 dark:to-orange-500/20 backdrop-blur-sm flex items-center justify-center border border-yellow-500/30 dark:border-yellow-400/30">
                  <img
                    src={items[activeCard]?.image}
                    alt={items[activeCard]?.type}
                    className="w-72 md:w-80 h-72 md:h-80 object-contain filter drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced theme-aware navigation */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCard(idx)}
                  className={`transition-all duration-500 rounded-full border-2 ${
                    idx === activeCard
                      ? "w-12 h-4 bg-yellow-600 dark:bg-yellow-400 border-yellow-600 dark:border-yellow-400"
                      : "w-4 h-4 bg-transparent border-gray-500 dark:border-gray-500 hover:border-yellow-600 dark:hover:border-yellow-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Theme-Aware Grid Showcase */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer ${
                  hoveredCard === idx ? "scale-105 z-20" : "scale-100"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-80 md:h-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-300/50 dark:border-gray-600/30 overflow-hidden shadow-lg">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-70 group-hover:opacity-80 dark:group-hover:opacity-90 transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Theme-aware overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent dark:from-black/90 dark:via-transparent dark:to-transparent"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 dark:from-yellow-400/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  ></div>

                  {/* Enhanced theme-aware content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-gray-900 dark:text-white">
                    <div className="inline-block px-3 py-1 bg-yellow-500/20 dark:bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-700 dark:text-yellow-400 text-xs font-semibold mb-3 border border-yellow-500/30 dark:border-yellow-400/30">
                      AVAILABLE
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-orange-600 dark:from-yellow-300 dark:to-orange-400">
                      {item.type}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-black text-yellow-600 dark:text-yellow-400">
                          ₹{item.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          /day
                        </span>
                      </div>

                      <button className="px-4 md:px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-500 text-white dark:text-black font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:scale-110 shadow-lg text-sm md:text-base">
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Theme-aware glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-500/20 dark:from-yellow-400/20 dark:via-transparent dark:to-orange-500/20 blur-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default OurFleet;
