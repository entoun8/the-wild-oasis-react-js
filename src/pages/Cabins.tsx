import React from "react";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinOperations from "../features/cabins/CabinsTableOperations";

const Cabins: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                All Cabins
              </h1>
              <p className="text-slate-600 text-lg">
                Manage and view all cabin information
              </p>
            </div>
            <CabinOperations />
          </div>
        </header>
        <div className="space-y-8">
          <CabinTable />
          <div className="flex justify-center">
            <AddCabin />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cabins;
