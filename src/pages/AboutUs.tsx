import { Link } from "react-router-dom";

// AboutUsPremium.tsx
// TypeScript + React + Tailwind CSS - Dark Theme Friendly

export default function AboutUsPremium() {
  return (
    <main className="min-h-screen text-gray-900 dark:bg-gray-900 transition-colors duration-500 dark:text-gray-100">
      {/* HERO */}
      <section className="w-full relative">
        <div className="h-64 md:h-[400px] w-full overflow-hidden rounded-b-2xl">
          <img
            src="https://res.cloudinary.com/dumreogj3/image/upload/v1760080236/AboutUs_twave8.png"
            alt="Premium scooter hero"
            className="w-full h-full object-cover object-center opacity-50 dark:opacity-30"
          />
        </div>

        {/* Tagline Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white drop-shadow-lg text-center px-4"></h1>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <section className="w-full py-12 px-4 md:px-6">
        {/* Our Story + Illustration */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-orange-500 dark:text-orange-400">
              Our Story
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              We started with a simple belief: city mobility should be
              effortless, safe, and elegantly designed. From a small local fleet
              to a thoughtfully curated rental experience, our goal has remained
              the same — make short trips smarter.
            </p>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              We combine modern vehicles, intuitive booking and white-glove
              maintenance to give you a reliable ride whenever you need it.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://res.cloudinary.com/dumreogj3/image/upload/v1758445611/photo_2025-09-21_14-36-06_h1w9uu.jpg"
              alt="Illustration of a rider on a bike"
              className="w-64 md:w-80 lg:w-96"
            />
          </div>
        </div>

        {/* Mission + Vision Cards */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-orange-500 dark:text-orange-400">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              To provide seamless, affordable and sustainable short-distance
              mobility options that make everyday travel effortless.
            </p>
          </div>

          <div className="rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-orange-500 dark:text-orange-400">
              Our Vision
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              To shape urban mobility where convenience meets responsibility — a
              future with smarter streets and happier riders.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="w-full py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-500 dark:text-orange-400">
              What You Get
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-center">
              Every ride includes comfort, safety, and complete peace of mind.
            </p>

            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 text-gray-900">
              {/* Card 1 */}
              {/* Card 1 */}
              <div className="p-8 rounded-2xl shadow-xl text-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md text-3xl">
                  🪖
                </div>
                <h3 className="mt-5 text-xl font-bold">Free Helmet</h3>
                <p className="mt-3 text-gray-600">
                  Complimentary helmet with every booking.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl shadow-xl text-center bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md text-3xl">
                  🧴
                </div>
                <h3 className="mt-5 text-xl font-bold">Sanitized Vehicle</h3>
                <p className="mt-3 text-gray-600">
                  Cleaned & disinfected before every ride.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl shadow-xl text-center bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md text-3xl">
                  💳
                </div>
                <h3 className="mt-5 text-xl font-bold">Secure Payments</h3>
                <p className="mt-3 text-gray-600">
                  100% safe & encrypted transactions.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-8 rounded-2xl shadow-xl text-center bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md text-3xl">
                  ⚡
                </div>
                <h3 className="mt-5 text-xl font-bold">Quick Pickup</h3>
                <p className="mt-3 text-gray-600">
                  Fast & hassle-free pickup and drop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 rounded-2xl my-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-16">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <img
                  src="founder.png"
                  className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-200 dark:border-gray-600"
                  alt="Saurabh Karki"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Saurabh Karki
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">
                  Founder
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Professional photographer with an eye for detail. Founded our
                  rental service to help people explore beautiful destinations.
                  Captures life's moments and ensures every ride is
                  picture-perfect.
                </p>
              </div>

              <div className="text-center">
                <img
                  src="co-founder.png"
                  className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-200 dark:border-gray-600"
                  alt="Kailash Joshi"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Kailash Joshi
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                  Co-Founder
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sweet shop owner turned customer service expert. Brings the
                  same warmth and care from his confectionery business to ensure
                  every customer has a delightful rental experience.
                </p>
              </div>

              <div className="text-center">
                <img
                  src="Tech lead.png"
                  className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-200 dark:border-gray-600"
                  alt="Rishabh Sharma"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Rishabh Sharma
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                  Business Consultant
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Experienced business consultant providing strategic guidance
                  and insights to help our company grow and operate efficiently.
                  Focuses on optimizing processes, identifying new
                  opportunities, and ensuring sustainable success
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
          <h3 className="text-3xl md:text-4xl font-extrabold text-orange-500 dark:text-orange-400">
            Start your ride today
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
            Explore our fleet and choose a ride that fits your day. Quick
            pickup, simple pricing and dependable vehicles — ready when you are.
          </p>

          <div className="mt-6">
            <Link
              to="/vehicle"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-12" />
    </main>
  );
}
