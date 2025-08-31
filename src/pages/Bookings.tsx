import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const Bookings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All bookings</h1>
          <p className="mt-2 text-gray-600">
            Manage and view all booking information
          </p>
        </div>
        <BookingTableOperations />
      </header>
      <BookingTable />
    </div>
  );
};

export default Bookings;
