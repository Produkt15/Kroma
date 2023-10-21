import React, { useState, useRef } from 'react';
import FilterButtons, { colorBlindness } from './FilterButtons';
import ImageUpload from './ImageUpload';
import Button from './Button';
import './TabGroup.css';
import "./Tab.css";


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
  if (filter === 'default') {
    const matrix = [
      0.618, 0.320, 0.062, 0, 0,
      0.163, 0.775, 0.062, 0, 0,
      0.163, 0.320, 0.516, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[0]) {
    const matrix = [
      0.618, 0.320, 0.062, 0, 0,
      0.163, 0.775, 0.062, 0, 0,
      0.163, 0.320, 0.516, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[1]) {
    const matrix = [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[2]) {
    const matrix = [
      0.967, 0.033, 0, 0, 0,
      0, 0.733, 0.267, 0, 0,
      0, 0.183, 0.817, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[3]) {
    const matrix = [
      0.95, 0.05, 0, 0, 0,
      0, 0.433, 0.567, 0, 0,
      0, 0.475, 0.525, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[4]) {
    const matrix = [
      0.8, 0.2, 0, 0, 0,
      0.258, 0.742, 0, 0, 0,
      0, 0.142, 0.858, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[5]) {
    const matrix = [
      0.817, 0.183, 0, 0, 0,
      0.333, 0.667, 0, 0, 0,
      0, 0.125, 0.875, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === colorBlindness[7]) {
    const matrix = [
      0.567, 0.433, 0, 0, 0,
      0.558, 0.442, 0, 0, 0,
      0, 0.242, 0.758, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  }
};

const FilteredImage = ({ originalImage, hasImage, setHasImage, setOriginalImage }) => {
  const [filteredImage, setFilteredImage] = useState(null);
  const canvasRef = useRef(null);

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
      const filteredDataUrl = canvas.toDataURL();
      setFilteredImage(filteredDataUrl);
    };
  };

  const Reset = () => {
    setOriginalImage(null);
    setFilteredImage(null);
    setHasImage(false);
  };

  const downloadFilteredImage = () => {
    const a = document.createElement('a');
    a.href = filteredImage;
    a.download = 'filtered_image.png';
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

        await applyFilterToCtx(ctxCopy, colorBlindness[i])

        const dataUrl = canvasCopy.toDataURL();
        const downloadPromise = new Promise((resolve) => {
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `filteredImage_${colorBlindness[i]}.png`;
          a.onload = resolve;
          a.click();
        });

        downloadPromises.push(downloadPromise);
      };
    }

    Promise.all(downloadPromises).then(() => {
      console.log('All downloads completed');
    });
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="container">
        <div className="centered">
          <FilterButtons applyFilter={applyFilter} />
        </div>
      </div>
      <section className="dropzone">
        <div className="dropzone-content" style={{ width: '1200', height: '400px'}}>
          <div className="dropzone-upload">
          <div className="to-get-started">
            {hasImage ? (
              filteredImage ? (<img
                src={filteredImage}
                alt="Filtered"
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />) : (
                <img
                src={originalImage}
                alt="Filtered"
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />
              )
              
            ) : ( 
              <div>
              <p>Upload an image from your computer.</p>
              {!(hasImage) && <ImageUpload onImageSelect={setOriginalImage} setHasImage={setHasImage} />}
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
      <div className="tab-group">
      {hasImage && <Button
          label="Download Filtered Image"
          hasLeftIcon={true}
          hasRightIcon={false}
          onClick={downloadFilteredImage}
        />}
        {hasImage && <Button
          label="Download All"
          hasLeftIcon={true}
          hasRightIcon={false}
          onClick={downloadAll}
        />}
        {hasImage && <Button
          label="Reset"
          hasLeftIcon={true}
          hasRightIcon={false}
          onClick={Reset}
        />}
      </div>
    </div>
  );
};

export default FilteredImage;
