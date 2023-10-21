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

const applyFilterToCtx = async (ctx, filter) => {
  // Apply the selected filter
  if (filter === 'default') {
    const matrix = [
      0.618, 0.320, 0.062, 0, 0,
      0.163, 0.775, 0.062, 0, 0,
      0.163, 0.320, 0.516, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[0]) {
    const matrix = [
      0.618, 0.320, 0.062, 0, 0,
      0.163, 0.775, 0.062, 0, 0,
      0.163, 0.320, 0.516, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[1]) {
    const matrix = [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[2]) {
    const matrix = [
      0.967, 0.033, 0, 0, 0,
      0, 0.733, 0.267, 0, 0,
      0, 0.183, 0.817, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[3]) {
    const matrix = [
      0.95, 0.05, 0, 0, 0,
      0, 0.433, 0.567, 0, 0,
      0, 0.475, 0.525, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[4]) {
    const matrix = [
      0.8, 0.2, 0, 0, 0,
      0.258, 0.742, 0, 0, 0,
      0, 0.142, 0.858, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[5]) {
    const matrix = [
      0.817, 0.183, 0, 0, 0,
      0.333, 0.667, 0, 0, 0,
      0, 0.125, 0.875, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindnes[7]) {
    const matrix = [
      0.567, 0.433, 0, 0, 0,
      0.558, 0.442, 0, 0, 0,
      0, 0.242, 0.758, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  }
}


const colorBlindnes = ['achromatomaly', 'achromatopsia', 'tritanomaly', 'tritanopia',
                       'deuteranomaly', 'protanomaly', 'protanopia']

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
      applyFilterToCtx(ctx, filter)
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

  const downloadAll = async () => {
    const downloadPromises = [];
  
    for (let i = 0; i < 7; i += 1) {
      const canvasCopy = document.createElement('canvas');
      const ctxCopy = canvasCopy.getContext('2d');
  
      const img = new Image();
      img.src = originalImage;
  
      img.onload = async () => {
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        ctxCopy.drawImage(img, 0, 0, img.width, img.height);
  
        await applyFilterToCtx(ctxCopy, colorBlindnes[i])
  
        const dataUrl = canvasCopy.toDataURL(); // Create a data URL for the filtered image
        const downloadPromise = new Promise((resolve) => {
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `filteredImage_${colorBlindnes[i]}.png`;
          a.onload = resolve;
          a.click();
        });
  
        downloadPromises.push(downloadPromise);
      };
    }
  
    // Wait for all downloads to complete
    Promise.all(downloadPromises).then(() => {
      console.log('All downloads completed');
    });
  };
  
  
  
  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div>
        <button onClick={() => applyFilter(colorBlindnes[0])}>Apply Achromatomaly Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[1])}>Apply Achromatopsia Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[2])}>Apply Tritanomaly Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[3])}>Apply Tritanopia Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[4])}>Apply Deuteranomaly Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[5])}>Apply Protanomaly Filter</button>
        <button onClick={() => applyFilter(colorBlindnes[6])}>Apply Protanopia Filter</button>
      </div>
      <div>
        <h2>Filtered Image</h2>
        <div style={{ width: '600px', height: '450px', backgroundColor: 'lightgrey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {filteredImage ? (
          <img
            src={filteredImage}
            alt="Filtered"
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
          />
        ) : (
          <p>Upload an image to apply filters</p>
        )}
      </div>
      </div>
      <div>
        <button onClick={downloadFilteredImage}>Download Filtered Image</button>
        <button onClick={downloadAll}>Download All</button>
      </div>
    </div>
  );
};

export default FilteredImage;
