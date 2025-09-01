import React from "react";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

const BookingTable: React.FC = () => {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200/50">
            <thead className="bg-gradient-to-r from-slate-50 to-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Cabin
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-slate-200/30">
              {bookings?.map((booking) => (
                <BookingRow booking={booking} key={booking.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination count={count || 0} />
    </div>
  );
};

export default BookingTable;
