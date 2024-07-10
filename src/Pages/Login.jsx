import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderSmall from "../Loader/LoaderSmall";
import { useNavigate } from "react-router-dom";
import baseURL from "../Common/Api"


const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedTime, setBlockedTime] = useState(null);

  useEffect(() => {
    // Check if the user is blocked and calculate the remaining time
    const blockInfo = JSON.parse(localStorage.getItem("blockInfo"));
    if (blockInfo && blockInfo.blockedUntil) {
      const currentTime = new Date().getTime();
      if (currentTime < blockInfo.blockedUntil) {
        setIsBlocked(true);
        setBlockedTime(blockInfo.blockedUntil);
      } else {
        // Unblock the user if the block time has passed
        localStorage.removeItem("blockInfo");
      }
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    if (!mobileNumber || !password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter both mobile number and password.",
      });
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowLoader(true);
    try {
      const response = await axios.post(
        `${baseURL}user/login`,
        { mobileNumber, password }
      );
      const { token, userType, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("collegeName", user.collegeName || "");

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (userType === "admin") {
        navigate("/dashboard");
      } else if (userType === "teacher") {
        navigate(`/teacherDashboard/${user._id}`);
      } else {
        // Handle other user types if needed
        console.log("Unknown userType:", userType);
      }
    } catch (error) {
      const failedAttempts =
        JSON.parse(localStorage.getItem("failedAttempts")) || 0;
      const newFailedAttempts = failedAttempts + 1;
      localStorage.setItem("failedAttempts", newFailedAttempts);

      if (newFailedAttempts >= 4) {
        const blockedUntil = new Date().getTime() + 24 * 60 * 60 * 1000; // Block for 24 hours
        localStorage.setItem("blockInfo", JSON.stringify({ blockedUntil }));
        setIsBlocked(true);
        setBlockedTime(blockedUntil);
        Swal.fire({
          icon: "error",
          title: "Login Blocked",
          text: "Too many failed attempts. Please try again after 24 hours.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your credentials and try again.",
        });
      }
    }
    setShowLoader(false);
  };

  if (isBlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You are blocked!</h2>
          <p className="mb-2">
            Too many failed login attempts. Please try again later.
          </p>
          <p>
            You will be able to try again at{" "}
            {new Date(blockedTime).toLocaleString()}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        {showLoader && <LoaderSmall />}
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Login
                </h3>

                <form onSubmit={handleLogin}>
                  <div className="mb-8">
                    <label
                      htmlFor="mobileNumber"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => {
                        const regex = /^[0-9]{0,10}$/;
                        if (
                          regex.test(e.target.value) ||
                          e.target.value === ""
                        ) {
                          setMobileNumber(e.target.value);
                        }
                      }}
                      placeholder="Enter your Mobile Number"
                      className="border-stroke w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8 relative">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 pr-10 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    <div
                      className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
