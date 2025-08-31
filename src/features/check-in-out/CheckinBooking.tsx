import BookingDataBox from "../bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useCheckout } from "./useCheckout";
import { useSettings } from "../settings/useSettings";

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { settings, isLoadingSettings } = useSettings();
  const { checkin, isCheckin } = useCheckin();
  const { checkout, isCheckout } = useCheckout();

  const [confirmPaid, setConfirmPaid] = useState(false);

  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  if (isLoading || isCheckin || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Check in booking #{bookingId}
        </h1>
        <button
          onClick={moveBack}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          ← Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div>
          <input
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
            type="checkbox"
          />
          <label htmlFor="breakfast">
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </label>
        </div>
      )}

      <div>
        <input
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          id="confirm"
          type="checkbox"
          disabled={confirmPaid || isCheckin}
        />
        <label htmlFor="confirm">
          I confirm that {guests.fullName} has already paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(optionalBreakfastPrice + totalPrice)}
        </label>
      </div>

      <div className="flex justify-end gap-3">
        {status === "unconfirmed" && (
          <button
            onClick={handleCheckin || isCheckin}
            disabled={!confirmPaid}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
          >
            Check in booking #{bookingId}
          </button>
        )}
        {status === "checked-in" && (
          <button
            onClick={() => checkout(bookingId)}
            disabled={isCheckout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
          >
            Check out booking #{bookingId}
          </button>
        )}

        <button
          onClick={moveBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CheckinBooking;
