import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${BackendUrl}/api/users/login`, {
        email,
        password,
        rememberMe: remember,
      })
      .then((res) => {
        toast.success("Login successful!");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "customer") {
          navigate("/Home");
        }
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/vimeo/469678167/studio-49821.mp4?width=1280&hash=af4b7e6a38a5e72b6b10b41ea7b5b4b12a1c3c49" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-professional-recording-studio-with-audio-equipment-42334-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-dj-working-in-a-recording-studio-42333-large.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        
        {/* Yellow Tint Overlay */}
        <div className="absolute inset-0 bg-yellow-400 bg-opacity-5 z-20"></div>
      </div>

      {/* Login Form - Centered */}
      <div className="w-full flex items-center justify-center px-4 relative z-30">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-full max-w-sm flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-xl border border-yellow-400 border-opacity-30 p-8 rounded-2xl shadow-2xl shadow-yellow-400/20"
          style={{
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.15), 0 0 80px rgba(251, 191, 36, 0.1), inset 0 0 0 1px rgba(251, 191, 36, 0.1)'
          }}
          data-aos="fade-up"
        >
          <h2 className="text-4xl text-white font-medium drop-shadow-lg" data-aos="zoom-in">
            Sign in
          </h2>
          <p
            className="text-sm text-gray-300 mt-3 drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Welcome back! Please sign in to continue
          </p>

          {/* Divider */}
          <div
            className="flex items-center gap-4 w-full my-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <p className="text-nowrap text-sm text-gray-300">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Email Field */}
          <div
            className="flex items-center w-full bg-black bg-opacity-40 backdrop-blur-sm border border-gray-600 border-opacity-50 h-12 rounded-full overflow-hidden pl-6 gap-2 hover:border-yellow-400 hover:border-opacity-50 transition-all duration-300 focus-within:border-yellow-400 focus-within:border-opacity-70 focus-within:shadow-lg focus-within:shadow-yellow-400/20"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#D1D5DB"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div
            className="flex items-center mt-6 w-full bg-black bg-opacity-40 backdrop-blur-sm border border-gray-600 border-opacity-50 h-12 rounded-full overflow-hidden pl-6 gap-2 hover:border-yellow-400 hover:border-opacity-50 transition-all duration-300 focus-within:border-yellow-400 focus-within:border-opacity-70 focus-within:shadow-lg focus-within:shadow-yellow-400/20"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#D1D5DB"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            className="w-full flex items-center justify-between mt-8 text-gray-300"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="flex items-center gap-2">
              <input
                className="h-5 accent-yellow-400 bg-transparent border-gray-600"
                type="checkbox"
                id="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline hover:text-yellow-400 transition-colors duration-300" href="#">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-black font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            Login
          </button>

          {/* Signup Link */}
          <p
            className="text-gray-300 text-sm mt-4"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Don't have an account?{" "}
            <a className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors duration-300" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* Subtle Audio Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full h-16 z-20 opacity-20">
        <div className="flex items-end justify-center h-full space-x-1">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="bg-yellow-400 w-1 rounded-t animate-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}