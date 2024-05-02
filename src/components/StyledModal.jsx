import { RiCloseLargeLine } from "react-icons/ri";

const Modal = ({ title, children, show, onClose = null }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full overflow-auto bg-gray-700 opacity-95 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center p-5 border-b">
              <h5 className="text-xl font-bold">{title}</h5>
              <button
                className="has-tooltip"
                onClick={handleClose}
              >
                <span className="tooltip text-xs bg-white p-1 -mt-0.5 lg:-mt-4 rounded">
                  Cerrar
                </span>
                <RiCloseLargeLine />
              </button>
            </div>
            <div className="p-5">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
