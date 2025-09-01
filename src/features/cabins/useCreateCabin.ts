import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin: any) => createEditCabinApi(newCabin, undefined),
    onSuccess: () => {
      toast.success("New cabin succesfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
};
