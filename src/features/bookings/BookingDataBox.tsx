import React from "react";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

interface BookingGuest {
  fullName: string;
  email: string;
  country?: string;
  countryFlag?: string;
  nationalID: string;
}

interface BookingCabin {
  name: string;
}

interface Booking {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations?: string;
  isPaid: boolean;
  guests: BookingGuest;
  cabins: BookingCabin;
}

interface BookingDataBoxProps {
  booking: Booking;
}

const BookingDataBox: React.FC<BookingDataBoxProps> = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <header className="bg-indigo-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <HiOutlineHomeModern className="text-2xl" />
          <p className="text-lg">
            {numNights} nights in Cabin <span className="font-semibold">{cabinName}</span>
          </p>
        </div>

        <p className="text-indigo-100">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 text-gray-700">
          {countryFlag && (
            <img 
              src={countryFlag} 
              alt={`Flag of ${country}`} 
              className="w-6 h-4 object-cover rounded border"
            />
          )}
          <p className="font-medium">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span className="text-gray-400">&bull;</span>
          <p className="text-gray-600">{email}</p>
          <span className="text-gray-400">&bull;</span>
          <p className="text-gray-600">National ID {nationalID}</p>
        </div>

        {observations && (
          <div className="flex gap-3">
            <div className="flex items-center gap-2 text-gray-600 font-medium min-w-0 flex-shrink-0">
              <HiOutlineChatBubbleBottomCenterText className="text-lg" />
              <span>Observations</span>
            </div>
            <p className="text-gray-800">{observations}</p>
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex items-center gap-2 text-gray-600 font-medium min-w-0 flex-shrink-0">
            <HiOutlineCheckCircle className="text-lg" />
            <span>Breakfast included?</span>
          </div>
          <p className="text-gray-800">{hasBreakfast ? "Yes" : "No"}</p>
        </div>

        <div className={`p-4 rounded-lg border-l-4 ${
          isPaid ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
        }`}>
          <div className="flex gap-3 mb-2">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <HiOutlineCurrencyDollar className="text-lg" />
              <span>Total price</span>
            </div>
            <div className="text-gray-800">
              <span className="text-xl font-semibold">{formatCurrency(totalPrice)}</span>
              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </div>
          </div>
          <p className={`text-sm font-medium ${
            isPaid ? 'text-green-700' : 'text-yellow-700'
          }`}>
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </div>

      <footer className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </footer>
    </section>
  );
};

export default BookingDataBox;
