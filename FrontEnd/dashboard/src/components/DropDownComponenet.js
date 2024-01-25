import React from 'react';

function DropDownComponent({ onHealthChange }) {
  const handleChange = (event) => {
    onHealthChange(event.target.value);
  };

  return (
    <div className="DropDown">
      <select onChange={handleChange}>
        <option value="Heart">Heart</option>
        <option value="Stroke">Stroke</option>
        <option value="Diabetes">Diabetes</option>
      </select>
    </div>
  );
}

export default DropDownComponent;
