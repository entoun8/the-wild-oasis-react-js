import React from "react";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

const CabinTable: React.FC = () => {
  const { isLoading, cabins, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins</div>;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/50">
          <thead className="bg-gradient-to-r from-slate-50 to-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Cabin
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-slate-200/30">
            {cabins?.map((cabin) => (
              <CabinRow cabin={cabin} key={cabin.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CabinTable;
