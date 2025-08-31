import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabinForm">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Add New Cabin
        </button>
      </Modal.Open>
      <Modal.Window name="cabinForm">
        <CabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
