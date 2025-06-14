import React, { useState } from 'react'

function Login(props) {

    const[isSignUp ,  setIsSignUp] = useState(false);

    const handleModalClick = (e) => {
        if (e.target.id === 'loginModal') {
            props.setIsModalOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        alert(`Logging in with Username: ${username} and Password: ${password}`);
        props.setIsModalOpen(false);
        e.target.reset();
    };
    return (
        <div
            id="loginModal"
            onClick={handleModalClick}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg p-6 w-80 max-w-full text-black relative">
                <button
                    onClick={() => props.setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl mb-4 font-semibold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-700">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-green-600 hover:underline focus:outline-none"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
