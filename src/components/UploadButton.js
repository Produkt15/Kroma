import React, { useRef } from 'react';
import Button from './Button';
import './Button.css';

const UploadButton = ({ onImageSelect }) => {
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onImageSelect}
      />
      <Button
        label="Upload from computer"
        hasLeftIcon={true}
        hasRightIcon={false}
        onClick={openFileDialog}
      />
    </div>
  );
};

export default UploadButton;
