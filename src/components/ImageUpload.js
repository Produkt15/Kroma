import React from 'react';
import UploadButton from './UploadButton';

const ImageUpload = ({ onImageSelect, setHasImage }) => {

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

  return (
    <div>
      <div>
      <UploadButton onImageSelect={handleImageUpload} />
    </div>
    </div>
  );
};

export default ImageUpload;
