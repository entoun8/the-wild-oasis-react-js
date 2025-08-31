import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

const BookingTable = () => {
  const { isLoading, bookings, error, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-0">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CABIN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GUEST
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATES
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings?.map((booking) => (
              <BookingRow booking={booking} key={booking.id} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default BookingTable;
