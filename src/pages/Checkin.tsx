import React from "react";
import CheckinBooking from "../features/check-in-out/CheckinBooking";

const Checkin: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
      <div className="max-w-4xl mx-auto">
        <CheckinBooking />
      </div>
    </main>
  );
};

export default Checkin;
