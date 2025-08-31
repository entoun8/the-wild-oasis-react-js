import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
};
