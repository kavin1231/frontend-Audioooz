import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const [stopScroll, setStopScroll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image:
        "https://manuals.plus/wp-content/uploads/2023/01/AZATOM-Blackfriars-B2-DAB-DABplus-FM-Radio-with-BT-Wireless-Audio-PRODUCT.jpg",
    },
    {
      title: "Design Your Digital Future",
      image:
        "https://rentprinceav.com/assets/images/product_imgs/1683274055.jpg",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image:
        "https://www.technorent.in/wp-content/uploads/2020/03/dj-light-Rent-Bangalore.jpg",
    },
    {
      title: "Think Big, Code Smart",
      image:
        "https://www.rentacomputer.com/images/products/usbmicrophone1.png",
    },
    {
      title: "Stage Setup Solutions",
      image:
        "https://images.squarespace-cdn.com/content/v1/58669c64197aea52832c9a2e/283cfa39-9ff4-4a38-b16d-1f6aa29bd8cf/mobile-stage-rental-milwaukee-madison-green-bay-wisconsin.png",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/empty-stage-colorful-lights-nightclub_23-2149768835.jpg')`,
        }}
        data-aos="fade-in"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to AudioMart
          </h1>
          <p className="text-lg md:text-2xl mb-6 max-w-2xl">
            Rent professional audio & event equipment easily and affordably.
          </p>
          <Link
            to="/product"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Marquee / Scrolling Cards */}
      <main className="my-16 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <style>{`
          .marquee-inner {
            animation: marqueeScroll linear infinite;
          }
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div
          className="overflow-hidden w-full relative max-w-6xl mx-auto"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 2500 + "ms",
            }}
          >
            <div className="flex">
              {[...cardData, ...cardData].map((card, index) => (
                <div
                  key={index}
                  className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt="card"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/40">
                    <p className="text-white text-lg font-semibold text-center">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-100 py-16" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
            <p>Rent by day, week, or month – your choice, your control.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Top Quality Gear</h3>
            <p>Get access to premium audio, lighting & event equipment.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p>Simple return process and support for peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white" data-aos="zoom-in">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Amazing service!", "The gear was top-notch.", "Will rent again soon!"].map((quote, idx) => (
              <div key={idx} className="p-6 shadow-md rounded-lg bg-gray-50">
                <p className="italic text-gray-700 mb-4">"{quote}"</p>
                <p className="font-semibold">Customer {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-yellow-400 py-12 text-center text-black" data-aos="flip-up">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Browse our rental catalog or contact us for custom packages.</p>
        <Link
          to="/product"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Explore Rentals
        </Link>
      </section>

      <Footer />
    </div>
  );
}
