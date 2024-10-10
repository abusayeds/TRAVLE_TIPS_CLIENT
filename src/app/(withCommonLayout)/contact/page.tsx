"use client"
import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5  py-10">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Have any questions or need help? Reach out to us and we'll get back to
          you soon!
        </motion.p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <label className="block text-gray-700 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
          </motion.div>

          <motion.button
            animate={{ scale: 1 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-300"
            initial={{ scale: 0.9 }}
            type="submit"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
