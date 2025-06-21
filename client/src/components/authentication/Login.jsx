import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const res = await axios.post('/api/auth/login', {
                email,
                password
            });

            if (res.data.status === false) {
                throw new Error("Not a valid user");
            }

            localStorage.setItem('token', res.data.token);
            console.log("Login successful");
        } catch (err) {
            console.error('Login error:', err.response?.data?.message || err.message);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center   bg-gradient-to-br from-black via-gray-800 via-black to-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-800  to-black text-white px-8 py-10 rounded-xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">LOGIN</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ email: e.target.value, password: formData.password })
                    }}
                    className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                        setFormData({ email: formData.email, password: e.target.value })
                    }}
                    className="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-800 transition duration-300 font-bold py-2 rounded"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline font-semibold">
                        SignUp
                    </Link>
                </p>
            </form>
        </div>
    );
}
