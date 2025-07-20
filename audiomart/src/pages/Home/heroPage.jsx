import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import FadeInImage from "../../components/fadeinImage";
import BasicNavbar from "./navBar";

export default function HeroPage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="relative h-screen w-full bg-black text-yellow-400 font-[Poppins] overflow-hidden">
      <BasicNavbar />

      {/* Background layer */}
      <div
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')",
          filter: "brightness(0.15) saturate(1.5)", // darken and enrich gold contrast
        }}
      />

      {/* Optional faded overlay */}
      <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 scale-150 select-none sm:scale-125">
        <FadeInImage
          alt="Gradient background"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/backgrounds/bg-gradient.png"
          style={{ filter: "brightness(0.7) sepia(1) hue-rotate(20deg)" }} // subtle warm gold tint
        />
      </div>

      {/* Content */}
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto">
        {/* Info pill */}
        <div
          className="flex items-center gap-2 border border-yellow-600 rounded-full px-4 py-2 text-sm mt-24 text-white"
          data-aos="fade-down"
        >
          <p>Explore how Audiomart empowers event sound.</p>
          <a href="#" className="flex items-center gap-1 font-semibold text-yellow-400 hover:text-yellow-500 transition">
            Read more
            <svg
              className="mt-0.5"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.959 9.5h11.083m0 0L9.501 3.96m5.541 5.54-5.541 5.542"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl font-semibold mt-5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-transparent bg-clip-text"
          data-aos="fade-up"
        >
          Rent Premium Audio Gear with Ease
        </h1>

        {/* Subtext */}
        <p
          className="text-white md:text-base line-clamp-3 max-md:px-2 mt-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Audiomart makes it effortless to rent top-tier sound systems and
          equipment for events, studios, and productions—on demand and
          hassle-free.
        </p>

        {/* CTA Buttons */}
        <div
          className="grid grid-cols-2 gap-3 mt-10 text-sm max-w-xs mx-auto"
          data-aos="zoom-in-up"
          data-aos-delay="400"
        >
          <Link
            to="/login"
            className="block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 transition rounded-full text-center font-semibold shadow-lg shadow-yellow-600/40"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="flex items-center gap-2 border border-yellow-600 rounded-full px-6 py-3 justify-center text-yellow-400 hover:bg-yellow-600 hover:text-black transition"
          >
            <span>Learn More</span>
            <svg
              className="mt-0.5"
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.25.5 4.75 4l-3.5 3.5"
                stroke="currentColor"
                strokeOpacity=".8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
