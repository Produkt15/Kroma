// src/App.js

import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import FilteredImage from './components/FilteredImage';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="App">
      <h1>Image Upload and Filter</h1>
      <FilteredImage originalImage={selectedImage} hasImage={hasImage} setHasImage={setHasImage} setOriginalImage={setSelectedImage} />
      {!(hasImage) && <ImageUpload onImageSelect={setSelectedImage} setHasImage={setHasImage} /> }
    </div>
  );
}

export default App;
