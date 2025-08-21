import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    category: '',
    price: '',
    experience: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (formData.role === 'user') {
        res = await axios.post('http://localhost:8080/api/auth/user/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: 'user',
        });
      } else {
        res = await axios.post('http://localhost:8080/api/auth/vendor/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: 'vendor',
          category: formData.category,
          price: Number(formData.price),
          experience: Number(formData.experience),
        });
      }

      if (res.data.status) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-800 to-black text-white px-8 py-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">SIGN UP</h2>

        <input type="text" name="name" placeholder="Name"
          value={formData.name} onChange={handleChange} required
          className="w-full mb-4 px-4 py-2 bg-gray-800 rounded" />

        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange} required
          className="w-full mb-4 px-4 py-2 bg-gray-800 rounded" />

        <input type="password" name="password" placeholder="Password"
          value={formData.password} onChange={handleChange} required
          className="w-full mb-4 px-4 py-2 bg-gray-800 rounded" />

        <input type="tel" name="phone" placeholder="Phone"
          value={formData.phone} onChange={handleChange} required
          className="w-full mb-6 px-4 py-2 bg-gray-800 rounded" />

        <div className="mb-6 flex justify-center gap-6">
          <label><input type="radio" name="role" value="user"
            checked={formData.role === 'user'} onChange={handleChange}/> User</label>
          <label><input type="radio" name="role" value="vendor"
            checked={formData.role === 'vendor'} onChange={handleChange}/> Vendor</label>
        </div>

        {formData.role === 'vendor' && (
          <>
            <input type="text" name="category" placeholder="Category"
              value={formData.category} onChange={handleChange} required
              className="w-full mb-4 px-4 py-2 bg-gray-800 rounded" />
            <input type="number" name="price" placeholder="Price"
              value={formData.price} onChange={handleChange} required
              className="w-full mb-4 px-4 py-2 bg-gray-800 rounded" />
            <input type="number" name="experience" placeholder="Experience (years)"
              value={formData.experience} onChange={handleChange} required
              className="w-full mb-6 px-4 py-2 bg-gray-800 rounded" />
          </>
        )}

        <button type="submit"
          className="w-full bg-slate-700 hover:bg-slate-800 py-2 rounded font-bold">
          Register
        </button>

        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}