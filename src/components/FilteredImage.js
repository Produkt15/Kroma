// src/components/FilteredImage.js

import React, { useState, useEffect, useRef } from 'react';


const applyMatrix = (ctx, matrix) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    data[i] = red * matrix[0] + green * matrix[1] + blue * matrix[2] + matrix[4];
    data[i + 1] = red * matrix[5] + green * matrix[6] + blue * matrix[7] + matrix[9];
    data[i + 2] = red * matrix[10] + green * matrix[11] + blue * matrix[12] + matrix[14];
  }

  ctx.putImageData(imageData, 0, 0);
};


const FilteredImage = ({ originalImage }) => {
  const [filteredImage, setFilteredImage] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (originalImage) {
      applyFilter();
    }
  }, [originalImage]);

  const applyFilter = (filter) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Apply the selected filter
      if (filter === 'default') {
        const matrix = [
          0.618, 0.320, 0.062, 0, 0,
          0.163, 0.775, 0.062, 0, 0,
          0.163, 0.320, 0.516, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'achromatomaly') {
        const matrix = [
          0.618, 0.320, 0.062, 0, 0,
          0.163, 0.775, 0.062, 0, 0,
          0.163, 0.320, 0.516, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'achromatopsia') {
        const matrix = [
          0.299, 0.587, 0.114, 0, 0,
          0.299, 0.587, 0.114, 0, 0,
          0.299, 0.587, 0.114, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'tritanomaly') {
        const matrix = [
          0.967, 0.033, 0,     0, 0,
          0,     0.733, 0.267, 0, 0,
          0,     0.183, 0.817, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'tritanopia') {
        const matrix = [
          0.95, 0.05,  0,     0, 0,
          0,    0.433, 0.567, 0, 0,
          0,    0.475, 0.525, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'deuteranomaly') {
        const matrix = [
          0.8,   0.2,   0,     0, 0,
          0.258, 0.742, 0,     0, 0,
          0,     0.142, 0.858, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'protanomaly') {
        const matrix = [
          0.817, 0.183, 0,     0, 0,
          0.333, 0.667, 0,     0, 0,
          0,     0.125, 0.875, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      } else if (filter === 'protanopia') {
        const matrix = [
          0.567, 0.433, 0,     0, 0,
          0.558, 0.442, 0,     0, 0,
          0,     0.242, 0.758, 0, 0,
          0, 0, 0, 1, 0,
        ];
        applyMatrix(ctx, matrix);
      }

      // Get the filtered image data
      const filteredDataUrl = canvas.toDataURL();
      setFilteredImage(filteredDataUrl);
    };
  };

  const downloadFilteredImage = () => {
    const a = document.createElement('a');
    a.href = filteredImage;
    a.download = 'filtered_image.png'; // Set the desired filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        <button onClick={() => applyFilter('achromatomaly')}>Apply Achromatomaly Filter</button>
        <button onClick={() => applyFilter('achromatopsia')}>Apply Achromatopsia Filter</button>
        <button onClick={() => applyFilter('tritanomaly')}>Apply Tritanomaly Filter</button>
        <button onClick={() => applyFilter('tritanopia')}>Apply Tritanopia Filter</button>
        <button onClick={() => applyFilter('deuteranomaly')}>Apply Deuteranomaly Filter</button>
        <button onClick={() => applyFilter('protanomaly')}>Apply Protanomaly Filter</button>
        <button onClick={() => applyFilter('protanopia')}>Apply Protanopia Filter</button>
        <button onClick={downloadFilteredImage}>Download Filtered Image</button>
      </div>
      {filteredImage && (
        <div>
          <h2>Filtered Image</h2>
          <img src={filteredImage} alt="Filtered" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default FilteredImage;
