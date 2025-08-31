import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import CabinForm from "./CabinForm";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

interface Cabin {
  id: number;
  image: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
}

const CabinRow = ({ cabin }: { cabin: Cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-lg object-cover shadow-sm"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-700">
            Fits up to {maxCapacity} guests
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-semibold text-gray-900">
            {formatCurrency(regularPrice)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {discount > 0 ? (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {formatCurrency(discount)}
            </span>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex space-x-2">
            <Modal>
              <Modal.Open opens="cabinEdit">
                <button className="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200">
                  <HiPencil className="w-4 h-4" />
                </button>
              </Modal.Open>
              <Modal.Window name="cabinEdit">
                <CabinForm cabinToEdit={cabin} />
              </Modal.Window>
              <Modal.Open opens="cabinDelete">
                <button className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <HiTrash className="w-4 h-4" />
                </button>
              </Modal.Open>
              <Modal.Window name="cabinDelete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                />
              </Modal.Window>
            </Modal>
            <button
              onClick={() => handleDuplicate()}
              className="inline-flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <HiSquare2Stack className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CabinRow;
