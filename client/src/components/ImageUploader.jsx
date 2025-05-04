import React, { useState } from "react";

const imgbbApiKey = "6c171f6d030ce621221a1f80dc90e024";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [pastedUrl, setPastedUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        setError("Image upload failed");
      }
    } catch (err) {
      setError("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl).then(() => {
        alert("Image URL copied to clipboard!");
      });
    }
  };

  const handlePasteUrl = (e) => {
    const pastedText = e.target.value;
    setPastedUrl(pastedText);

    // Check if it's an image URL
    if (pastedText.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      setImageUrl(pastedText);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Upload Image to get URL</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
        className="mb-2"
      />
      {uploading && <p className="text-blue-500">Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <p className="font-medium">Image URL:</p>
          <div className="flex items-center">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex-1 break-all"
            >
              {imageUrl}
            </a>
            <button
              onClick={handleCopyUrl}
              className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
            >
              Copy URL
            </button>
          </div>
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full h-auto border rounded"
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Paste Image URL:</h3>
        <input
          type="text"
          placeholder="Paste image URL here"
          value={pastedUrl}
          onChange={handlePasteUrl}
          className="mt-2 p-2 border rounded w-full"
        />
        {pastedUrl && imageUrl && (
          <div className="mt-4">
            <p>Image Preview:</p>
            <img
              src={imageUrl}
              alt="Pasted URL Preview"
              className="mt-2 max-w-full h-auto border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
