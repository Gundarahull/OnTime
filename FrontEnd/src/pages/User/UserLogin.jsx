import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [userData, setUserData] = useState(null);
  const {
    register,
    handleSubmit,
    setError, // For manual error handling
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    setUserData({
      email: data.email,
      password: data.password,
    });
    
    // Perform API call or authentication logic here
  };

  return (
    <>
      <div className="flex flex-col justify-between p-8 h-screen">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-black">OnTime</h1>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label htmlFor="email" className="text-xl font-semibold">
                What's your email
              </label>
              <input
                id="email"
                className="w-full bg-slate-300 rounded-xl py-2 px-4 h-12 mb-3 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="email"
                placeholder="email@OnTime.co.in"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 5,
                    message: "The minimum length should be 5 characters",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}

              <label htmlFor="password" className="text-xl font-semibold">
                Enter Password
              </label>
              <input
                id="password"
                className="w-full bg-slate-300 rounded-xl py-2 px-4 h-12 mb-3 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "The minimum length should be 5 characters",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center mt-4 bg-black text-white font-medium py-2 px-4 rounded-md shadow-md w-full h-12 transition disabled:opacity-50"
              >
                Log In
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-4">
              New here?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create a new account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center">
          <Link
            to="/captain-login"
            className="flex items-center justify-center mt-1 bg-orange-500 text-white font-medium py-2 px-4 rounded-md shadow-md w-80 h-12 hover:bg-orange-600 transition"
          >
            Sign In as a Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;