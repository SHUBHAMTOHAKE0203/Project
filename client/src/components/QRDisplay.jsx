import React from 'react'

const QRDisplay = () => {
    return (
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-lg font-semibold mb-2">Or Scan & Donate</h2>
        <img
          src="qrrrr.jpg"
          alt="Donate via QR"
          className="w-48 h-48 object-contain"
        />
      </div>
    );
  };
  
export default QRDisplay;
  