import React, { useState } from 'react';
import './App.css';
import FilteredImage from './components/FilteredImage';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="home">
      <header className="header">
        <img className="logo-icon1" alt="" src="/logo.svg" />
        <h1 className="create-visible-interfaces">
          Create visible interfaces for everyone
        </h1>
      </header>
      <main className="body">
        <img className="vector-icon" alt="" src="/bg.svg" />
        <div className="frame">
          <div className="content">
            <h2 className="color-blindness-type">Color Blindness Type</h2>
            <FilteredImage originalImage={selectedImage} hasImage={hasImage} setHasImage={setHasImage} setOriginalImage={setSelectedImage} />
          </div>
        </div>
      </main>
    </div>

  );
}

export default App;
