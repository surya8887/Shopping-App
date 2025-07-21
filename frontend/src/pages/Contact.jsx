import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold text-center tracking-tight mb-4"
        >
          Let’s Connect
        </motion.h2>

        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-lg">
          Have a question, custom request, or just want to say hello? Fill out the form below, and our team will get back to you shortly.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name */}
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm"
              placeholder="Looking for a custom size"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm"
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-black text-white px-10 py-3 rounded-full text-sm tracking-wider hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
