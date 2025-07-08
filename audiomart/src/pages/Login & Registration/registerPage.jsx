import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(""); // Added role selection
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        .post(`${BackendUrl}/api/users`, {
          email,
          password,
          role, // Include role in payload
          firstname: firstName,
          lastname: lastName,
          address,
          phone,
        })
        .then(() => {
          toast.success("Registration Successful");
          navigate("/");
        })
        .catch((err) => {
          console.error(
            "Registration error:",
            err.response?.data || err.message
          );
          toast.error(err?.response?.data?.error || "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex h-[800px] w-full">
      {/* Left Side Image */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Right Side Registration Form */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleOnSubmit}
          className="md:w-[450px] w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
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
            },
            {
              label: "Last Name",
              value: lastName,
              setValue: setLastName,
              type: "text",
              error: errors.lastName,
              name: "lastName",
            },
            {
              label: "Email",
              value: email,
              setValue: setEmail,
              type: "email",
              error: errors.email,
              name: "email",
            },
            {
              label: "Password",
              value: password,
              setValue: setPassword,
              type: "password",
              error: errors.password,
              name: "password",
            },
            {
              label: "Address",
              value: address,
              setValue: setAddress,
              type: "text",
              error: errors.address,
              name: "address",
            },
            {
              label: "Phone",
              value: phone,
              setValue: setPhone,
              type: "text",
              error: errors.phone,
              name: "phone",
            },
          ].map((field, idx) => (
            <div key={idx} className="w-full mt-4">
              <div
                className={`flex items-center bg-transparent border ${
                  field.error ? "border-red-500" : "border-gray-300/60"
                } h-12 rounded-full overflow-hidden pl-6 gap-2`}
              >
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
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
          <div className="w-full mt-4">
            <label
              htmlFor="role"
              className={`block mb-1 text-sm font-medium ${
                errors.role ? "text-red-500" : "text-gray-700"
              }`}
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full h-12 rounded-full pl-6 text-gray-700 border ${
                errors.role ? "border-red-500" : "border-gray-300/60"
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
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          {/* Link to Login */}
          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
