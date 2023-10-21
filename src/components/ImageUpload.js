// src/components/ImageUpload.js

import React from 'react';

const ImageUpload = ({ onImageSelect, setHasImage }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        onImageSelect(e.target.result); // Pass the selected image data back to the parent
        setHasImage(true);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUpload;
