import React from "react";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const Bookings: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                All Bookings
              </h1>
              <p className="text-slate-600 text-lg">
                Manage and view all booking information
              </p>
            </div>
            <BookingTableOperations />
          </div>
        </header>
        <BookingTable />
      </div>
    </main>
  );
};

export default Bookings;
