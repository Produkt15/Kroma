import React from 'react';
import './Button.css';

const Button = ({ label = 'Upload from computer', hasLeftIcon = true, hasRightIcon = false, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {hasLeftIcon && (
        <img className="carboncloud-upload-icon" alt="" src="/carboncloudupload.svg" />
      )}
      <div className="upload-from-computer">{label}</div>
      {hasRightIcon && (
        <img className="carboncloud-upload-icon" alt="" src="/carboncloudupload.svg" />
      )}
    </button>
  );
};

export default Button;
