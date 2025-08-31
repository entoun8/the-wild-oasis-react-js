import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name }) => {
  const { close, openName } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={close}
          className="absolute top-3 right-3 z-10 p-1 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        <div className="p-6">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
