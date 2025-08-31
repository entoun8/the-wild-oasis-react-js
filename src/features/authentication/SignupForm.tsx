import React from "react";
import { useForm } from "react-hook-form";
import { HiXMark, HiUserPlus } from "react-icons/hi2";
import { useSignup } from "./useSignup";

function SignupForm(): React.JSX.Element {
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = ({ email, password, fullName }) => {
    signup({ email, password, fullName }, { onSettled: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-6"
    >
      <div>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords need to match",
          })}
        />
        {errors.passwordConfirm && (
          <p className="text-red-500 text-sm mt-1">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="reset"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <HiXMark className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <HiUserPlus className="w-4 h-4" />
          {isLoading ? "Creating..." : "Create new user"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
