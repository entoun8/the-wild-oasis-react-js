import React, { useState } from "react";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

const UpdateSettingsForm: React.FC = () => {
  const { isLoading, settings, error } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const [formData, setFormData] = useState({
    minBookingLength: 0,
    maxBookingLength: 0,
    maxNumberOfGuestPerBooking: 0,
    breakfastPrice: 0,
  });

  React.useEffect(() => {
    if (settings) {
      setFormData({
        minBookingLength: settings.minBookingLength || 0,
        maxBookingLength: settings.maxBookingLength || 0,
        maxNumberOfGuestPerBooking: settings.maxNumberOfGuestPerBooking || 0,
        breakfastPrice: settings.breakfastPrice || 0,
      });
    }
  }, [settings]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading settings</div>;

  const handleInputChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSetting(formData);
  };


  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/40 overflow-hidden">
      <form onSubmit={handleSubmit} className="divide-y divide-slate-200/50">
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-8">
            <div>
              <label
                htmlFor="min-nights"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Minimum nights/booking
              </label>
              <input
                type="number"
                id="min-nights"
                value={formData.minBookingLength}
                onChange={(e) => handleInputChange('minBookingLength', e.target.value)}
                disabled={isUpdating}
                className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
              />
            </div>
            <div>
              <label
                htmlFor="max-nights"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Maximum nights/booking
              </label>
              <input
                type="number"
                id="max-nights"
                value={formData.maxBookingLength}
                onChange={(e) => handleInputChange('maxBookingLength', e.target.value)}
                disabled={isUpdating}
                className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
              />
            </div>
            <div>
              <label
                htmlFor="max-guests"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Maximum guests/booking
              </label>
              <input
                type="number"
                id="max-guests"
                value={formData.maxNumberOfGuestPerBooking}
                onChange={(e) => handleInputChange('maxNumberOfGuestPerBooking', e.target.value)}
                disabled={isUpdating}
                className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
              />
            </div>
          </div>
        </div>
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div>
              <label
                htmlFor="breakfast-price"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Breakfast price
              </label>
              <input
                type="number"
                id="breakfast-price"
                step="0.01"
                value={formData.breakfastPrice}
                onChange={(e) => handleInputChange('breakfastPrice', e.target.value)}
                disabled={isUpdating}
                className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 px-4 py-3"
              />
            </div>
          </div>
        </div>
        <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-white flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setFormData({
              minBookingLength: settings?.minBookingLength || 0,
              maxBookingLength: settings?.maxBookingLength || 0,
              maxNumberOfGuestPerBooking: settings?.maxNumberOfGuestPerBooking || 0,
              breakfastPrice: settings?.breakfastPrice || 0,
            })}
            disabled={isUpdating}
            className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-sm transition-all duration-200 hover:scale-105"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-8 py-3 border border-transparent rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-lg transition-all duration-200 hover:scale-105"
          >
            {isUpdating ? 'Updating...' : 'Update Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSettingsForm;
