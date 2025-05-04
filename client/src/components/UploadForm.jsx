// client/src/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ location, fetchSpots }) {
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) return;
    await axios.post('http://localhost:4000/spots', {
      lat: location[0],
      lng: location[1],
      image,
    });
    setImage('');
    fetchSpots();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded ml-2">
        Submit
      </button>
    </form>
  );
}

export default UploadForm;
