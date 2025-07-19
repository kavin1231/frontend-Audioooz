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
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-yellow-500 text-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg md:text-xl">
            Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10" data-aos="fade-up">
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">1. Information We Collect</h2>
          <p className="text-white leading-relaxed">
            We collect information that you provide when registering, placing orders, contacting
            support, or using our services. This includes your name, email address, contact
            information, payment details, and browsing activity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">2. How We Use Your Data</h2>
          <p className="text-white leading-relaxed">
            Your data is used to process transactions, provide customer service, improve our
            platform, and send relevant communications. We do not sell or rent your data to third
            parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">3. Data Security</h2>
          <p className="text-white leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal
            information, including encryption, secure servers, and access controls.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">4. Cookies</h2>
          <p className="text-white leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and personalize
            content. You can choose to disable cookies via your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">5. Your Rights</h2>
          <p className="text-white leading-relaxed">
            You have the right to access, correct, or delete your personal data. You may also opt
            out of marketing communications at any time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">6. Changes to This Policy</h2>
          <p className="text-white leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-yellow-400 text-black py-12 text-center px-6" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-lg mb-4">Reach out to our support team for further assistance.</p>
        <a
          href="mailto:support@audiomart.com"
          className="inline-block bg-black text-yellow-400 font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Contact Support
        </a>
      </section>

      <Footer />
    </div>
  );
}
