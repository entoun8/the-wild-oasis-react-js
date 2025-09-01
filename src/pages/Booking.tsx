import React from "react";
import BookingDetail from "../features/bookings/BookingDetail";

const Booking: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
      <div className="max-w-4xl mx-auto">
        <BookingDetail />
      </div>
    </main>
  );
};

export default Booking;
