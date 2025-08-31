import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";

const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();

  if (isLoading || !settings) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxNumberOfGuestPerBooking,
    breakfastPrice,
  } = settings;

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
      <form className="divide-y divide-gray-200">
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6">
            <div>
              <label
                htmlFor="min-nights"
                className="block text-sm font-medium text-gray-900"
              >
                Minimum nights/booking
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="min-nights"
                  value={minBookingLength}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="max-nights"
                className="block text-sm font-medium text-gray-900"
              >
                Maximum nights/booking
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="max-nights"
                  value={maxBookingLength}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="max-guests"
                className="block text-sm font-medium text-gray-900"
              >
                Maximum guests/booking
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="max-guests"
                  value={maxNumberOfGuestPerBooking}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div>
              <label
                htmlFor="breakfast-price"
                className="block text-sm font-medium text-gray-900"
              >
                Breakfast price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="breakfast-price"
                  step="0.01"
                  value={breakfastPrice}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSettingsForm;
