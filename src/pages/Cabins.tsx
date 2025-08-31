import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinOperations from "../features/cabins/CabinsTableOperations";

const Cabins = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All cabins</h1>
          <p className="mt-2 text-gray-600">
            Manage and view all cabin information
          </p>
        </div>
        <CabinOperations />
      </header>
      <CabinTable />
      <div className="mt-6">
        <AddCabin />
      </div>
    </div>
  );
};

export default Cabins;
