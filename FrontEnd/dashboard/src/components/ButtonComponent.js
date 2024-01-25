import React, { useState } from 'react';

const ButtonComponent = ({ isTable, setIsTable }) => {

  const handleClick = () => {
    setIsTable(!isTable);
  };

  return (
    <div className = "Button">
    <button onClick={handleClick}>
      {isTable ? 'Table' : 'Analytics'}
    </button>
    </div>
  );
};

export default ButtonComponent;
