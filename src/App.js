// src/App.js

import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import FilteredImage from './components/FilteredImage';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h1>Image Upload and Filter</h1>
      <ImageUpload onImageSelect={setSelectedImage} />
      <FilteredImage originalImage={selectedImage} />
    </div>
  );
}

export default App;
