import React from "react";
import CheckinBooking from "../features/check-in-out/CheckinBooking";

const Checkin: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        <CheckinBooking />
      </div>
    </main>
  );
};

export default Checkin;
