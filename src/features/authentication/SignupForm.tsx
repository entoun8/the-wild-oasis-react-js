import React from "react";
import { useForm } from "react-hook-form";
import { HiXMark, HiUserPlus } from "react-icons/hi2";
import { useSignup } from "./useSignup";

interface FormData {
  email: string;
  password: string;
  fullName: string;
  passwordConfirm: string;
}

const SignupForm: React.FC = () => {
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>();

  const onSubmit = ({ email, password, fullName }: FormData) => {
    signup({ email, password, fullName }, { onSettled: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
            disabled={isLoading}
            {...register("fullName", { required: "This field is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Provide a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Min 8 characters"
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Repeat password"
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues("password") || "Passwords need to match",
            })}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-2">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50">
        <button
          type="reset"
          className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-sm transition-all duration-200"
          disabled={isLoading}
        >
          <HiXMark className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3 border border-transparent rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-lg transition-all duration-200"
          disabled={isLoading}
        >
          <HiUserPlus className="w-4 h-4" />
          {isLoading ? "Creating..." : "Create New User"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
