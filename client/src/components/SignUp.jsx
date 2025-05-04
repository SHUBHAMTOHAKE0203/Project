// import React, { useState } from 'react';
// import { auth,db } from '../../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { ref, set } from 'firebase/database';

// export default function Signup() {
//   const [form, setForm] = useState({ name: '', email: '', password: '', photo: null });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ ...form, [name]: files ? files[0] : value });
//   };

//   const uploadToR2 = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const res = await fetch('http://localhost:4000/upload-to-r2', {
//       method: 'POST',
//       body: formData,
//     });
//     const data = await res.json();
//     return data.url;
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, photo } = form;
//     try {
//       const userCred = await createUserWithEmailAndPassword(auth, email, password);
//       const uid = userCred.user.uid;
//       const photoURL = photo ? await uploadToR2(photo) : '';
//       await set(ref(db, 'users/' + uid), { name, email, photoURL });
//       alert('Signup successful');
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <input name="photo" type="file" accept="image/*" onChange={handleChange} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { Mail, Lock, User, Upload, Camera } from 'lucide-react';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', photo: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewURL, setPreviewURL] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
      // Create preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadToR2 = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:4000/upload-to-r2', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const { name, email, password, photo } = form;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const photoURL = photo ? await uploadToR2(photo) : '';
      await set(ref(db, 'users/' + uid), { name, email, photoURL });
      alert('Signup successful');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community and get started today
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed ${previewURL ? 'border-transparent' : 'border-gray-300'} bg-gray-100 overflow-hidden`}>
                {previewURL ? (
                  <img src={previewURL} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <label htmlFor="photo" className="absolute bottom-0 right-0 p-1 bg-amber-600 rounded-full text-white cursor-pointer hover:bg-amber-700 transition-colors">
                <Upload className="w-4 h-4" />
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">Upload profile picture (optional)</p>
          </div>

          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm"
                placeholder="••••••••"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
          </div>

          {/* Submit button */}
          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300 transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}