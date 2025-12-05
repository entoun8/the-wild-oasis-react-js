import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { LoginData } from "../../types";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginData) => loginApi({ email, password }),

    onSuccess: (user) => {
      toast.success("user logged in");
      navigate("/dashboard");
      console.log(user);
    },

    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
