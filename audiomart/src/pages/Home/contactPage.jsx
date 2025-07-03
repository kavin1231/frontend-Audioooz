// src/pages/ContactPage.jsx
import React from "react";
import Header from "../../header";

export default function ContactPage() {
  return (
    <div>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">Contact Us</h1>
        <p className="text-gray-700 text-lg">
          We'd love to hear from you! Feel free to reach out with any questions, feedback, or partnership opportunities.
        </p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p><strong>Phone:</strong> +1-212-456-7890</p>
          <p><strong>Email:</strong> contact@example.com</p>
          <p><strong>Address:</strong> 123 Audio Lane, Sound City, NY 10001</p>
        </div>
      </section>
    </div>
  );
}
