import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Signuphandler from "../utils/Signuphandler";

function Signup() {
  const cities = ["Guntur", "Vijayawada", "Hyderabad", "Chennai"];
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    dob: "",
    gender: "",
    district: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Signuphandler(formData, navigate);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-green-500">
      {/* Top Image */}
      <div className="h-40 sm:h-56 w-full">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
          alt="Farmer in field"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Signup Form */}
      <div className="flex-1 flex justify-center items-start bg-white rounded-t-3xl -mt-6 p-6 shadow-lg">
        <div className="w-full max-w-sm sm:max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 text-center">
            Farmer Signup
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
            />
            <input
              type="number"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
            />
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                <span className="text-sm sm:text-base">Male</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                <span className="text-sm sm:text-base">Female</span>
              </label>
            </div>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
            >
              <option value="" disabled>
                -- Select a district --
              </option>
              {cities.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-green-600 text-white rounded px-4 py-2 mt-2 hover:bg-green-700 transition text-sm sm:text-base"
            >
              Signup
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
