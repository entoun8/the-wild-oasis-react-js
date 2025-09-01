import React from "react";
import { format, isToday } from "date-fns";
import {
  HiEye,
  HiTrash,
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
}

const BookingRow: React.FC<{ booking: Booking }> = ({ booking }) => {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const { checkout, isCheckout } = useCheckout();
  const { isDeleting, deleteBkng } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm",
    "checked-in":
      "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm",
    "checked-out":
      "bg-slate-100 text-slate-700 border border-slate-200 shadow-sm",
  };

  const navigate = useNavigate();

  return (
    <tr className="hover:bg-slate-50/50 transition-all duration-200 group">
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm font-semibold text-slate-800">{cabinName}</div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm font-semibold text-slate-800">{guestName}</div>
        <div className="text-sm text-slate-500 mt-1">{email}</div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm text-slate-800 font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          → {numNights} night stay
        </div>
        <div className="text-sm text-slate-500 mt-1">
          {format(new Date(startDate), "MMM dd yyyy")} —{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <span
          className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${statusToTagName[status]}`}
        >
          {status.replace("-", " ")}
        </span>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm font-bold text-slate-800">
          {formatCurrency(totalPrice)}
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/bookings/${bookingId}`)}
            className="inline-flex items-center justify-center w-9 h-9 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm"
            title="View details"
          >
            <HiEye className="w-4 h-4" />
          </button>
          {status === "unconfirmed" && (
            <button
              onClick={() => navigate(`/checkin/${bookingId}`)}
              className="inline-flex items-center justify-center w-9 h-9 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 hover:scale-105 transition-all duration-200 shadow-sm"
              title="Check in"
            >
              <HiArrowRightOnRectangle className="w-4 h-4" />
            </button>
          )}
          {status === "checked-in" && (
            <button
              onClick={() => checkout(bookingId)}
              disabled={isCheckout}
              className="inline-flex items-center justify-center w-9 h-9 text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 hover:scale-105 transition-all duration-200 shadow-sm disabled:opacity-50"
              title="Check out"
            >
              <HiArrowLeftOnRectangle className="w-4 h-4" />
            </button>
          )}
          <Modal>
            <Modal.Open opens="bookingDelete">
              <button
                className="inline-flex items-center justify-center w-9 h-9 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm"
                title="Delete booking"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            </Modal.Open>
            <Modal.Window name="bookingDelete">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBkng(bookingId)}
                onCloseModal={() => {}}
              />
            </Modal.Window>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
