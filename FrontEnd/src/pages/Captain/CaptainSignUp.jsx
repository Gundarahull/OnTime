import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CapatainDataContext } from "../context/CaptainContext";

const CaptainSignUp = () => {
  const { captain, setCaptain } = useContext(CapatainDataContext);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError, // For manual error handling
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setApiError(null);
    setLoading(true);

    const signUpData = {
      fullName: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.color,
        type: data.type,
        capacity: data.capacity,
        plate: data.plate,
      },
    };

    // Perform API call or authentication logic here
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        signUpData
      );

      if (response?.status === 201) {
        const captainData = response.data;
        setCaptain(captainData);
        navigate("/captain-login");
      } else {
        setApiError("Unexpected error. Please try again.");
      }
    } catch (error) {

      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setApiError(errorMessage);
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.field, { type: "manual", message: err.message });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between p-4 h-screen">
        <div className="p-2">
          <div className=" w-full flex ">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold text-black ">OnTime</h1>
            </div>

            <img
              src="https://img.freepik.com/premium-vector/driver-vector-logo-design_410429-4782.jpg?semt=ais_hybrid"
              alt="Captain Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label className="text-xl font-semibold">What's your Name</label>
              <div className="flex gap-2  mb-2">
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <label className="text-xl font-semibold">
                What's your Vehicle
              </label>
              <div className="flex gap-2  mb-2">
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="color"
                  {...register("color", {
                    required: "Color is required",
                    minLength: {
                      value: 3,
                      message: "The minimum length should be 3 characters",
                    },
                  })}
                />
                {errors.color && <p>{errors.color.message}</p>}
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="motorcycle,car,auto"
                  {...register("type", {
                    required: "Vehicle Type is required",
                    minLength: {
                      value: 3,
                      message: "The minimum length should be 3 characters",
                    },
                  })}
                />
                {errors.type && <p>{errors.type.message}</p>}
                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="number"
                  placeholder="capacity"
                  {...register("capacity", {
                    required: "Vehicle Capacity is required",
                  })}
                />
                {errors.capacity && <p>{errors.capacity.message}</p>}

                <input
                  className="w-1/2 bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="plate"
                  {...register("plate", {
                    required: "Vehicle Plate is required",
                    minLength: {
                      value: 5,
                      message: "The minimum length should be 5 characters",
                    },
                  })}
                />
                {errors.plate && <p>{errors.plate.message}</p>}
              </div>
              <label htmlFor="email" className="text-xl font-semibold">
                What's your email
              </label>
              <input
                id="email"
                className="w-full bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full bg-slate-300 rounded-xl py-2 px-4 h-12 mb-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                disabled={loading}
                className={`flex items-center justify-center mt-4 bg-black text-white font-medium py-2 px-4 rounded-md shadow-md w-full h-12 transition disabled:opacity-50 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Create an Account "}
              </button>
            </form>
            {apiError && (
              <p className="text-red-600 text-center mb-4 mt-2 font-bold">
                {apiError}
              </p>
            )}

            <p className="text-center text-gray-600 text-sm mt-2">
              Already Captain?{" "}
              <Link
                to="/captain-login"
                className="text-blue-600 hover:underline"
              >
                Login here Captain
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500 text-center font-semibold">
            © {new Date().getFullYear()} OnTime. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignUp;
