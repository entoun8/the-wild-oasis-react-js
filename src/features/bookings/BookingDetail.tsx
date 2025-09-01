import React from "react";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";

const BookingDetail: React.FC = () => {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const getStatusStyles = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border shadow-sm";
    switch (status) {
      case "unconfirmed":
        return `${baseClasses} bg-blue-100 text-blue-700 border-blue-200`;
      case "checked-in":
        return `${baseClasses} bg-emerald-100 text-emerald-700 border-emerald-200`;
      case "checked-out":
        return `${baseClasses} bg-slate-100 text-slate-700 border-slate-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-700 border-slate-200`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200/60">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Booking #{bookingId}
            </h1>
            <span className={getStatusStyles(status)}>
              {status.replace("-", " ")}
            </span>
          </div>
          <button
            onClick={moveBack}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            ← Back
          </button>
        </div>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex justify-end">
        <button
          onClick={moveBack}
          className="px-8 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-800 font-medium shadow-lg transition-all duration-200 hover:scale-105"
        >
          Back to Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
