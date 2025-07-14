import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    if (validateForm()) {
      setIsLoading(true);
      axios
        .post(`${BackendUrl}/api/users/register`, {
          email,
          password,
          role,
          firstname: firstName,
          lastname: lastName,
          address,
          phone,
        })
        .then(() => {
          toast.success("Registration Successful");
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex h-full w-full bg-black text-white">
      {/* Left Side Image */}
      <div className="w-full hidden md:inline-block" data-aos="fade-right">
        <img
          className="h-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Right Side Registration Form */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleOnSubmit}
          className="md:w-[450px] w-80 flex flex-col items-center justify-center"
          data-aos="fade-up"
        >
          <h2 className="text-4xl text-white font-medium" data-aos="zoom-in">
            Sign up
          </h2>
          <p className="text-sm text-gray-400 mt-3" data-aos="fade-up" data-aos-delay="100">
            Create your account to get started
          </p>

          {/* Input Fields */}
          {[
            {
              label: "First Name",
              value: firstName,
              setValue: setFirstName,
              type: "text",
              error: errors.firstName,
              name: "firstName",
              delay: 200,
            },
            {
              label: "Last Name",
              value: lastName,
              setValue: setLastName,
              type: "text",
              error: errors.lastName,
              name: "lastName",
              delay: 300,
            },
            {
              label: "Email",
              value: email,
              setValue: setEmail,
              type: "email",
              error: errors.email,
              name: "email",
              delay: 400,
            },
            {
              label: "Password",
              value: password,
              setValue: setPassword,
              type: "password",
              error: errors.password,
              name: "password",
              delay: 500,
            },
            {
              label: "Address",
              value: address,
              setValue: setAddress,
              type: "text",
              error: errors.address,
              name: "address",
              delay: 600,
            },
            {
              label: "Phone",
              value: phone,
              setValue: setPhone,
              type: "text",
              error: errors.phone,
              name: "phone",
              delay: 700,
            },
          ].map((field, idx) => (
            <div key={idx} className="w-full mt-4" data-aos="fade-up" data-aos-delay={field.delay}>
              <div
                className={`flex items-center bg-transparent border ${
                  field.error ? "border-red-500" : "border-gray-700"
                } h-12 rounded-full overflow-hidden pl-6 gap-2`}
              >
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  className="bg-transparent text-gray-400 placeholder-gray-500 outline-none text-sm w-full h-full"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  required
                />
              </div>
              {field.error && (
                <p className="text-red-500 text-xs mt-1">{field.error}</p>
              )}
            </div>
          ))}

          {/* Role Select */}
          <div className="w-full mt-4" data-aos="fade-up" data-aos-delay="800">
            <label
              htmlFor="role"
              className={`block mb-1 text-sm font-medium ${
                errors.role ? "text-red-500" : "text-gray-300"
              }`}
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full h-12 rounded-full pl-6 bg-black text-white placeholder-gray-500 ${
                errors.role ? "border-red-500" : "border border-gray-700"
              }`}
              required
            >
              <option value="">Select a role</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full h-11 rounded-full text-white bg-yellow-400 hover:bg-yellow-500 transition"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          {/* Link to Login */}
          <p className="text-gray-400 text-sm mt-4" data-aos="fade-up" data-aos-delay="1000">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
