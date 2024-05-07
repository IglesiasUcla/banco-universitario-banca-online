import React from 'react';

const Panel = ({ title, children, titleStyle }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h2 className="text-3xl font-bold my-8" style={titleStyle}>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Panel;