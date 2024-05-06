import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { cutText } from "../../../utils/formatters";
import MovementAPI from "../../../api/MovementAPI"; 
import useToast from "../../../hooks/useToast";

const Row = ({ movement, index, showActions = true }) => { 

  const { width } = useWindowDimensions();

  const movementsAPI = new MovementAPI(); 

  return (
    <div
      id={`movement-table-row-${index}`} 
      className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
    >
      <span
        id={`movement-table-row-${index}-amount`} 
        className="w-[25%]"
      >
        {width <= 1030 ? cutText(movement.amount, 15) : movement.amount} 
      </span>
      <span
        id={`movement-table-row-${index}-account-number`} 
        className="w-[25%]"
      >
        {width <= 1030 ? cutText(movement.account_number, 10) : movement.account_number} 
      </span>
      <span
        id={`movement-table-row-${index}-description`} // Cambiado de contact-table-row a movement-table-row
        className="w-[25%]"
      >
        {width <= 1030 ? cutText(movement.description, 15) : movement.description} 
      </span>
      <span
        id={`movement-table-row-${index}-created-at`} 
        className="w-[25%]"
      >
        {width <= 1030 ? cutText(movement.created_at, 15) : movement.created_at} 
      </span>
    </div>
  );
};

export default Row;
