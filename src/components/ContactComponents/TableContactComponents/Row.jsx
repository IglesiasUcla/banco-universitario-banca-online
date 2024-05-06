import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMoneyBillTransfer, FaEllipsisVertical } from "react-icons/fa6";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { cutText } from "../../../utils/formatters";

import Modal from "../../StyledModal";
import StyledButton from "../../StyledButton";
import ContactAPI from "../../../api/ContactAPI";
import useToast from "../../../hooks/useToast";

const Row = ({ contact, index, showActions = true }) => {

  const { width } = useWindowDimensions();

  const { showErrorToast, showSuccessToast } = useToast();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => setIsOpen(value => !value);

  const contactAPI = new ContactAPI();

  const toEditContact = () => navigate(`/contacts/${contact.id}/edit`);

  const deleteContact = async () => {
    try {
      await contactAPI.delete(contact.id);
      handleCloseModal();
      showSuccessToast("El contacto fue eliminado con éxito.");
    } catch (error) {
      showErrorToast("No fue posible eliminar el contacto. " + error);
    }
  }

  return (
    <div
      id={`contact-table-row-${index}`}
      className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
    >
      <span
        id={`contact-table-row-${index}-alias`}
        className="w-[20%]"
      >
        {width <= 1024 ? cutText(contact.alias, 15) : contact.alias}
      </span>
      <span
        id={`contact-table-row-${index}-account-number`}
        className="w-[20%]"
      >
        {width <= 1024 ? cutText(contact.account_number, 10) : contact.account_number}
      </span>
      <span
        id={`contact-table-row-${index}-description`}
        className="w-[20%]"
      >
        {width <= 1024 ? cutText(contact.description, 15) : contact.description}
      </span>
      {showActions && ( // Mostrar los botones solo si showActions es true
      <div
        id={`contact-table-row-${index}-buttons`}
        className="w-[20%] h-full"
      >
        {width <= 544 ?
          <div
            className="w-full h-full flex justify-center items-center"
          >
            <button
              className="has-tooltip"
              onClick={handleIsOpen}
            >
              <span className="tooltip text-xs bg-white p-1 -mt-4 rounded">
                Opciones
              </span>
              <FaEllipsisVertical
                className="text-white bg-[#49beb7] hover:bg-[#24837c] h-6 w-6 p-1 rounded"
              />
              {isOpen && ( // Render dropdown content only when open
                <div
                  className="absolute right-0 mt-2 py-2 w-48 flex flex-col bg-white rounded-md shadow-md z-50" // Dropdown styles
                >
                  {/* Add your dropdown menu items here */}
                  <button onClick={toEditContact} className="text-left hover:bg-gray-100 py-1 px-2">
                    Editar
                  </button>
                  <button className="text-left hover:bg-gray-100 py-1 px-2">
                    Transferir
                  </button>
                  <button onClick={handleOpenModal} className="text-left hover:bg-gray-100 py-1 px-2">
                    Eliminar
                  </button>
                </div>
              )}
            </button>
          </div>
          :
          <div
            className="w-full h-full flex justify-end items-center space-x-2"
          >
            <button
              className="has-tooltip"
              onClick={toEditContact}
            >
              <span className="tooltip text-xs bg-white p-1 -mt-0.5 lg:-mt-4 rounded">
                Editar
              </span>
              <FaEdit
                className="text-white bg-[#49beb7] hover:bg-[#24837c] h-6 w-6 p-1 rounded"
              />
            </button>
            <button
              className="has-tooltip"
            >
              <span className="tooltip text-xs bg-white p-1 -mt-0.5 lg:-mt-4 rounded">
                Transferir
              </span>
              <FaMoneyBillTransfer
                className="text-white bg-[#49beb7] hover:bg-[#24837c] h-6 w-6 p-1 rounded"
              />
            </button>
            <button
              className="has-tooltip"
              onClick={handleOpenModal}
            >
              <span className="tooltip text-xs bg-white p-1 -mt-0.5 lg:-mt-4 rounded">
                Eliminar
              </span>
              <FaRegTrashAlt
                className="text-white bg-[#49beb7] hover:bg-[#24837c] h-6 w-6 p-1 rounded"
              />
            </button>
          </div>
        }
        
        <Modal
          title="¿Está seguro de eliminar este contacto?"
          show={showModal}
          onClose={handleCloseModal}
        >
          <div
            id="modal-content"
            className="space-y-4"
          >
            <p>
              Está por eliminar al contacto bajo el alias de {contact.alias}. ¿Está seguro de eliminarlo?
            </p>
            <div
              id="modal-buttons"
              className="w-full flex justify-end space-x-4"
            >
              <StyledButton
                label="Cancelar"
                onClick={handleCloseModal}
                className="bg-[#9a9a9a] border-[#9a9a9a] text-white hover:bg-[#747474]"
              />
              <StyledButton
                label="Eliminar"
                onClick={deleteContact}
                className="bg-[#f15e5e] border-[#f15e5e] text-white hover:bg-[#a44040]"
              />
            </div>
          </div>
        </Modal>
      </div>
      )}
    </div>
  );
};

export default Row;