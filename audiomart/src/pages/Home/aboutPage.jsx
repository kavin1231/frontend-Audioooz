// src/pages/AboutPage.jsx
import React from "react";
import Header from "../../header";

export default function AboutPage() {
  return (
    <div>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to our audio marketplace! We are passionate about providing a platform where music
          lovers, creators, and tech enthusiasts can discover and share amazing audio products.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Our mission is to bring innovative solutions to the audio community. Whether you're a buyer
          or a seller, we aim to give you the best experience with smooth, reliable transactions and
          top-notch service.
        </p>
      </section>
    </div>
  );
}
