import React from "react";
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

const CabinRow: React.FC<{ cabin: Cabin }> = ({ cabin }) => {
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
    <tr className="hover:bg-slate-50/50 transition-all duration-200 group">
      <td className="px-6 py-5 whitespace-nowrap">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-slate-200/60 group-hover:scale-105 transition-transform duration-200"
        />
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm font-semibold text-slate-800">{name}</div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm text-slate-600 font-medium">
          Fits up to {maxCapacity} guests
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm font-bold text-slate-800">
          {formatCurrency(regularPrice)}
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        {discount > 0 ? (
          <span className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
            {formatCurrency(discount)}
          </span>
        ) : (
          <span className="text-slate-400 font-medium">—</span>
        )}
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex space-x-2">
          <Modal>
            <Modal.Open opens="cabinEdit">
              <button 
                className="inline-flex items-center justify-center w-9 h-9 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm"
                title="Edit cabin"
              >
                <HiPencil className="w-4 h-4" />
              </button>
            </Modal.Open>
            <Modal.Window name="cabinEdit">
              <CabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="cabinDelete">
              <button 
                className="inline-flex items-center justify-center w-9 h-9 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm"
                title="Delete cabin"
              >
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
            onClick={handleDuplicate}
            disabled={isCreating}
            className="inline-flex items-center justify-center w-9 h-9 text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 hover:scale-105 transition-all duration-200 shadow-sm disabled:opacity-50"
            title="Duplicate cabin"
          >
            <HiSquare2Stack className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CabinRow;
