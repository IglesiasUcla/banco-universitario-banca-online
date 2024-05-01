import React from 'react';

const Boton = ({ buttonText, buttonColor, buttonHoverColor, colorText, ...props }) => {
  const buttonStyle = `bg-${buttonColor} hover:bg-${buttonHoverColor} text-${colorText} font-bold py-2 px-4 rounded`;

  return (
    <div className="inline-block float-left my-4">
      <button className={buttonStyle} {...props}>
        {buttonText}
      </button>
    </div>
  );
};

export default Boton;
