import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

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
      .catch((err) => {
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex h-[700px] w-full bg-black text-white">
      {/* Left Side Image */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-white font-medium">Sign in</h2>
          <p className="text-sm text-gray-400 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={() =>
              (window.location.href = "http://localhost:3005/api/users/google")
            }
            className="w-full mt-8 bg-gray-800 border border-gray-600 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-700"></div>
            <p className="w-full text-nowrap text-sm text-gray-400">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          {/* Email Field */}
          <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-400 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-400 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="w-full flex items-center justify-between mt-8 text-gray-400">
            <div className="flex items-center gap-2">
              <input
                className="h-5"
                type="checkbox"
                id="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-yellow-400 hover:bg-yellow-500 transition"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <a className="text-yellow-400 hover:underline" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
