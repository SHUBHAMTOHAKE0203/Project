import React, { useState } from "react";

import ImageUploader from "./ImageUploader";

const SimpleForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsSubmitted(true);
          form.reset();
        } else {
          alert("Something went wrong. Please try again!");
        }
      });
  };

  return (
    <>
    
      
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <ImageUploader/>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl space-y-6"
          encType="multipart/form-data"
        >
          {/* Hidden Inputs */}
          <input
            type="hidden"
            name="access_key"
            value="38eed1f2-4967-4818-841b-a0fc78a477d8"
          />
          <input
            type="hidden"
            name="subject"
            value="Email and Image Upload"
          />

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
             <input
              type="text"
              name="text"
              required
              placeholder="Enter your query"
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

        

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md"
            >
              Submit
            </button>

            {isSubmitted && (
              <p className="text-green-600 text-center font-medium mt-4">
                Form submitted successfully!
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SimpleForm;