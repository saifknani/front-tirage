"use client";
import React, { useState } from "react";
import { loginUser, verifyTwoFactorCode } from "../api/auth";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";
const Login = () => {
  const { activeProfile, setActiveProfile } = useContext(UserContext);
  const [loginMode, setLoginMode] = useState("mailPassword");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const resp = await loginUser({ ...formData });

      if (resp) {
        if (resp.error) {
          setError("Email or Password incorrect");
        } else {
          console.log(resp);
          localStorage.setItem("token", resp.accessToken);
         

          window.location.href = "/asset-page";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Email or Password incorrect");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center lg:px-6 mx-auto md:h-screen lg:py-0 lg:w-[50%]">
        <div className="w-full bg-white  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login
            </h1>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 d"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`bg-gray-50 border ${
                  error ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
                placeholder="name@company.com"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  error ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  `}
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <button
              style={{ boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.08)" }}
              onClick={() => handleLogin()}
              className="w-full text-white bg-[#140E59] hover:bg-white hover:text-[#140E59] hover:border-[#140E59] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Continue
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <span className="text-center text-[#2b77bb] text-[15px] font-normal">
              Forget password
            </span>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center background  w-[50%] h-full gap-10 ">
        <span className="text-white font-bold text-center text-3xl">
          Welcome to{" "}
          <span className="text-[#2B77BB] font-bold text-3xl">Admin Dashboard</span>
        </span>
        <img src="assets/login.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
