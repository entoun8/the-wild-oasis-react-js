import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const getStatusStyles = (status) => {
    const baseClasses =
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "unconfirmed":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "checked-in":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "checked-out":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Booking #{bookingId}
          </h1>
          <span className={getStatusStyles(status)}>
            {status.replace("-", " ")}
          </span>
        </div>
        <button
          onClick={moveBack}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          ← Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex justify-end gap-3">
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

export default BookingDetail;
