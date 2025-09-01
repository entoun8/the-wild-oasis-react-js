import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

interface EditCabinParams {
  newCabinData: any;
  id: number;
}

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinParams) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
};
