import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactElement } from "react";

interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openName: "",
  open: () => {},
  close: () => {},
});

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }: { children: ReactElement; opens: string }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) } as any);
};

const Window = ({ children, name }: { children: ReactElement; name: string }) => {
  const { close, openName } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20"
        onClick={close}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          ×
        </button>
        <div className="p-8">
          {cloneElement(children, { onCloseModal: close } as any)}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
