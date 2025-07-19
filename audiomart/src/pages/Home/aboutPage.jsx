import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import { FaMusic, FaHeadphones, FaHandshake } from "react-icons/fa";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-yellow-400 to-yellow-300 text-black py-20"
        data-aos="fade-down"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AudioMart</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Connecting sound lovers with powerful tools and premium gear.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto px-6 py-16" data-aos="fade-up">
        <div className="space-y-6">
          <p className="text-gray-800 text-lg leading-relaxed">
            Welcome to AudioMart – your trusted audio marketplace. Whether you're a passionate
            musician, a sound tech geek, or someone looking for high-quality gear, you've come to
            the right place.
          </p>
          <p className="text-gray-800 text-lg leading-relaxed">
            We aim to provide a seamless and secure experience for buying and renting audio
            equipment. Our community is built on trust, innovation, and love for sound.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center text-yellow-600 mb-12"
            data-aos="fade-up"
          >
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="zoom-in"
            >
              <FaMusic className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">For Creators</h3>
              <p className="text-gray-700">
                Discover, sell, or rent gear that powers your creativity and helps you grow.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <FaHeadphones className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tech Enthusiasts</h3>
              <p className="text-gray-700">
                Explore a wide range of audio equipment tailored to your taste and need.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <FaHandshake className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trust & Support</h3>
              <p className="text-gray-700">
                Enjoy secure transactions, active support, and a community you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-400 text-black py-12">
        <div
          className="max-w-4xl mx-auto text-center px-6"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to explore premium audio gear?
          </h2>
          <p className="text-lg mb-6">
            Join our marketplace and be a part of the sound revolution.
          </p>
          <Link to="/product">
            <button className="bg-black text-yellow-400 font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
