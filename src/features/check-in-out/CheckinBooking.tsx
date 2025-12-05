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
  const { settings, isLoading: isLoadingSettings } = useSettings();
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Check in booking #{bookingId}
            </h1>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === 'unconfirmed' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : status === 'checked-in'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {status}
              </div>
            </div>
          </div>
          <button
            onClick={moveBack}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Booking Details */}
      <BookingDataBox booking={booking} />

      {/* Additional Options */}
      <div className="space-y-6">
        {!hasBreakfast && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Additional Services</h3>
            <div className="flex items-start gap-3">
              <input
                checked={addBreakfast}
                onChange={() => {
                  setAddBreakfast((breakfast) => !breakfast);
                  setConfirmPaid(false);
                }}
                id="breakfast"
                type="checkbox"
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="breakfast" className="text-slate-700 leading-relaxed">
                <span className="font-medium">Add breakfast</span> for{" "}
                <span className="font-semibold text-green-600">
                  {formatCurrency(optionalBreakfastPrice)}
                </span>
                <div className="text-sm text-slate-500 mt-1">
                  {numGuests} guests × {numNights} nights × {formatCurrency(settings.breakfastPrice)} per person
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Payment Confirmation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Confirmation</h3>
          <div className="flex items-start gap-3">
            <input
              checked={confirmPaid}
              onChange={() => setConfirmPaid((paid) => !paid)}
              id="confirm"
              type="checkbox"
              disabled={confirmPaid || isCheckin}
              className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
            />
            <label htmlFor="confirm" className="text-slate-700 leading-relaxed">
              <span className="font-medium">I confirm that {guests.fullName} has paid the total amount of{" "}</span>
              <span className="font-bold text-green-600">
                {!addBreakfast
                  ? formatCurrency(totalPrice)
                  : formatCurrency(optionalBreakfastPrice + totalPrice)}
              </span>
              {addBreakfast && (
                <div className="text-sm text-slate-500 mt-2 pl-4 border-l-2 border-slate-200">
                  Original amount: {formatCurrency(totalPrice)}<br/>
                  Breakfast: +{formatCurrency(optionalBreakfastPrice)}<br/>
                  <span className="font-medium">Total: {formatCurrency(optionalBreakfastPrice + totalPrice)}</span>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <button
          onClick={moveBack}
          className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-gray-50 font-medium transition-all duration-200 hover:shadow-sm"
        >
          Cancel
        </button>
        
        <div className="flex gap-3">
          {status === "unconfirmed" && (
            <button
              onClick={handleCheckin}
              disabled={!confirmPaid || isCheckin}
              className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isCheckin ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Checking in...
                </div>
              ) : (
                `Check in booking #${bookingId}`
              )}
            </button>
          )}
          
          {status === "checked-in" && (
            <button
              onClick={() => checkout(bookingId)}
              disabled={isCheckout}
              className="px-8 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckout ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Checking out...
                </div>
              ) : (
                `Check out booking #${bookingId}`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckinBooking;
