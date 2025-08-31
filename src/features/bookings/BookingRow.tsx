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

const BookingRow = ({ booking }: { booking: Booking }) => {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const { checkout, isCheckout } = useCheckout();
  const { isDeleting, deleteBkng } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "bg-blue-100 text-blue-800",
    "checked-in": "bg-green-100 text-green-800",
    "checked-out": "bg-gray-100 text-gray-800",
  };

  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{cabinName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{guestName}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          → {numNights} night stay
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(startDate), "MMM dd yyyy")} —{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusToTagName[status]}`}
        >
          {status.replace("-", " ")}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          {formatCurrency(totalPrice)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/bookings/${bookingId}`)}
            className="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200"
          >
            <HiEye className="w-4 h-4" />
          </button>
          {status === "unconfirmed" && (
            <button
              onClick={() => navigate(`/checkin/${bookingId}`)}
              className="inline-flex items-center justify-center w-8 h-8 text-green-600 bg-green-100 rounded-md hover:bg-green-200 transition-colors duration-200"
            >
              <HiArrowRightOnRectangle className="w-4 h-4" />
            </button>
          )}
          {status === "checked-in" && (
            <button
              onClick={() => checkout(bookingId)}
              disabled={isCheckout}
              className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200"
            >
              <HiArrowLeftOnRectangle className="w-4 h-4" />
            </button>
          )}
          <Modal>
            <Modal.Open opens="bookingDelete">
              <button className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200">
                <HiTrash className="w-4 h-4" />
              </button>
            </Modal.Open>
            <Modal.Window name="bookingDelete">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBkng(bookingId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
