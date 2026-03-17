// src/components/ui/ToggleSwitch.jsx
import React from "react";
import "../../styles/ui.css";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="ui-field toggle-field">
      {label && <label>{label}</label>}

      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;