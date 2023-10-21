import React from 'react';
import './Button.css';

const Button = ({ label = 'Upload from computer',
  hasLeftIcon = true,
  hasRightIcon = false,
  onClick,
  buttonClass = "button",
  buttonIcon = "carboncloudupload"
}) => {
  return (
    <button className={buttonClass} onClick={onClick}>
      {hasLeftIcon && (
        <img className="carboncloud-upload-icon" alt="" src="/carboncloudupload.svg" />
      )}
      <div className="upload-from-computer">{label}</div>
      {hasRightIcon && (
        <img className="carboncloud-upload-icon" alt="" src="/{buttonIcon}.svg" />
      )}
    </button>
  );
};

export default Button;
