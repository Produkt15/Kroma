import React, { useRef } from 'react';

const ImageUpload = ({ onImageSelect, setHasImage }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        onImageSelect(e.target.result);
        setHasImage(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the input element
        onChange={handleImageUpload}
      />
      <label className="custom-file-upload" onClick={openFileDialog}>
        Choose File
      </label>
    </div>
  );
};

export default ImageUpload;
