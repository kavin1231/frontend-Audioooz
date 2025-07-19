// src/pages/PrivacyPolicyPage.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../header";
import Footer from "../../footer";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header />

      <section className="max-w-5xl mx-auto px-6 py-16" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">Privacy Policy</h1>

        <p className="text-lg leading-relaxed mb-4">
          At Audiomart, we respect your privacy and are committed to protecting your personal data.
          This Privacy Policy outlines how we collect, use, and safeguard your information when you
          use our platform.
        </p>

        <div className="space-y-8 mt-10">
          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-base leading-relaxed text-gray-700">
              We may collect personal information such as your name, email address, contact
              details, and usage data when you register, place orders, or interact with the site.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="text-base leading-relaxed text-gray-700">
              We use your information to provide and improve our services, process transactions,
              send notifications, and ensure a safe and personalized experience on our platform.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-2xl font-semibold mb-2">3. Data Sharing and Security</h2>
            <p className="text-base leading-relaxed text-gray-700">
              We do not sell or rent your data to third parties. Your information is securely stored
              and only accessible to authorized personnel under strict confidentiality agreements.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking</h2>
            <p className="text-base leading-relaxed text-gray-700">
              Audiomart uses cookies to enhance user experience and analyze site performance. You
              can manage your cookie preferences through your browser settings.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="500">
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p className="text-base leading-relaxed text-gray-700">
              You have the right to access, update, or delete your personal information at any time.
              Please contact our support team to exercise your data protection rights.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-2xl font-semibold mb-2">6. Updates to This Policy</h2>
            <p className="text-base leading-relaxed text-gray-700">
              We may update this Privacy Policy periodically. Any changes will be posted on this
              page with a revised effective date.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Last updated: July 19, 2025
        </p>
      </section>
      <Footer />
    </div>
  );
}
