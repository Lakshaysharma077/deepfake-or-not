import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../componenets/Navbar';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        navigate('/detect');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Banner */}
      <div className="bg-yellow-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
          <span className="font-medium">
            Love the experience? Help support this platform’s development!
          </span>
          <button className="mt-2 md:mt-0 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            ☕ Buy Me A Coffee
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg mb-8">
            Log in to continue sharing and exploring incidents from the community.
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="flex-grow bg-gray-50 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        © {new Date().getFullYear()} Incidents App. All rights reserved.
      </footer>
    </div>
  );
}
