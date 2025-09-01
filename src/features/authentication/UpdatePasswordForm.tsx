import React from "react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "./useUpdateUser";

interface FormData {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm(): React.JSX.Element {
  const { register, handleSubmit, formState, getValues, reset } = useForm<FormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: FormData): void {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 px-4 py-3"
            placeholder="Min 8 characters"
          />
          {errors?.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value: string) =>
                getValues().password === value || "Passwords need to match",
            })}
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 px-4 py-3"
            placeholder="Repeat password"
          />
          {errors?.passwordConfirm && (
            <p className="text-red-500 text-sm mt-2">{errors.passwordConfirm.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50">
        <button 
          onClick={() => reset()} 
          type="button" 
          className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-sm transition-all duration-200"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isUpdating} 
          className="px-8 py-3 border border-transparent rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-lg transition-all duration-200"
        >
          {isUpdating ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;