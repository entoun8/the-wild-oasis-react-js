import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "../bookings/useRecentBookings";
import { useRecentStays } from "../bookings/useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

function DashboardLayout() {
  const { bookings, isLoading: loadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: loadingStays, numDays } = useRecentStays();
  const { cabins, isLoading: loadingCabins } = useCabins();

  if (loadingBookings || loadingStays || loadingCabins) return <Spinner />;

  return (
    <div className="space-y-6 sm:space-y-8">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
