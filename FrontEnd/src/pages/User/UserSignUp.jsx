import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserSignUp = () => {
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
    const signUpData = {
      fullName: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
    };
    setUserData(signUpData);

    // Perform API call or authentication logic here
  };

  return (
    <>
      <div className="flex flex-col justify-between p-8 h-screen">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-black">OnTime</h1>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label className="text-xl font-semibold">What's your Name</label>
              <div className="flex gap-2  mb-3">
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-3 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="FirstName"
                  {...register("firstName", {
                    required: "FirstName is required",
                    minLength: {
                      value: 3,
                      message: "The minimum length should be 3 characters",
                    },
                  })}
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-3 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="LastName"
                  {...register("lastName", {
                    required: "LastName is required",
                    minLength: {
                      value: 3,
                      message: "The minimum length should be 3 characters",
                    },
                  })}
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </div>
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
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 text-center font-semibold">
            © {new Date().getFullYear()} OnTime. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};


export default UserSignUp;