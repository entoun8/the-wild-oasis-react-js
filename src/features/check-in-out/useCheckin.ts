import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }: { bookingId: number; breakfast: any }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} succesfully checked in`);
      queryClient.invalidateQueries({ type: 'active' });
      navigate("/");
    },

    onError: () => toast.error("there was an error while checking in"),
  });

  return { checkin, isCheckin };
};
