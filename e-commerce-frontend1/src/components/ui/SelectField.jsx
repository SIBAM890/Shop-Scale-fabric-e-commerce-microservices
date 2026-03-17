// src/components/ui/SelectField.jsx
import React from "react";

const SelectField = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="ui-field">
      {label && <label>{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;