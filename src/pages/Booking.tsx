import React from "react";
import BookingDetail from "../features/bookings/BookingDetail";

const Booking: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        <BookingDetail />
      </div>
    </main>
  );
};

export default Booking;
