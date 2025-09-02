import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import type { SignupData } from "../../types";

export const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (userData: SignupData) => signupApi(userData),
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the new account from the users email address"
      );
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
};
