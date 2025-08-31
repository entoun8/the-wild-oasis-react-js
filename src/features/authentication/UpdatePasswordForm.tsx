import React from "react";
import { useForm, FieldValues } from "react-hook-form";

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
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password (min 8 characters)</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
        />
        {errors?.password && <span className="text-sm text-red-600 mt-1">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700 mb-1">Confirm password</label>
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
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
        />
        {errors?.passwordConfirm && <span className="text-sm text-red-600 mt-1">{errors.passwordConfirm.message}</span>}
      </div>
      <div className="flex gap-3 pt-4">
        <button onClick={reset} type="reset" className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isUpdating} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Update password</button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;