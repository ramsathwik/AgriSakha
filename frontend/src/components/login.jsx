import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // 1 = enter number, 2 = enter otp
  const navigate = useNavigate();

  const sendOtpHandler = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummyToken123");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem("expiry", tomorrow.getTime());
    navigate("/home");
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

      {/* Login Form */}
      <div className="flex-1 flex justify-center items-start bg-white rounded-t-3xl -mt-6 p-6 shadow-lg">
        <div className="w-full max-w-sm sm:max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 text-center">
            Farmer Login
          </h2>

          {step === 1 && (
            <form onSubmit={sendOtpHandler} className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Enter Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-green-600 text-white rounded px-4 py-2 mt-2 hover:bg-green-700 transition text-sm sm:text-base"
              >
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={loginHandler} className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-green-600 text-white rounded px-4 py-2 mt-2 hover:bg-green-700 transition text-sm sm:text-base"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-green-600 font-semibold text-sm hover:underline"
              >
                Change Number
              </button>
            </form>
          )}

          {/* Signup Redirect */}
          <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
            Don’t have an account?{" "}
            <NavLink
              to="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
