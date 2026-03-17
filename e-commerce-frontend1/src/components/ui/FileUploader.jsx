// src/components/ui/FileUploader.jsx
import React from "react";

const FileUploader = ({ label, onChange }) => {
  return (
    <div className="ui-field">
      {label && <label>{label}</label>}

      <input
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
      />
    </div>
  );
};

export default FileUploader;