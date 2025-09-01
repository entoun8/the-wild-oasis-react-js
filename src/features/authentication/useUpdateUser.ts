import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

interface UpdateUserData {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (userData: UpdateUserData) => updateCurrentUser(userData),
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
