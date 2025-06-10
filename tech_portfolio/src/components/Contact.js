import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for reaching out, ${form.name}! I'll get back to you soon.`);
    // You can add actual form submission logic here
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-10 text-center">
        Get In Touch
      </h1>

      {/* Contact Info */}
      <div className="mb-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Connect with me</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center justify-center md:justify-start space-x-3">
              <FaLinkedin className="text-blue-600" size={24} />
              <a
                href="www.linkedin.com/in/kody-hatcher-a99768234"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.linkedin.com/in/kody-hatcher-a99768234
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-3">
              <FaGithub size={24} />
              <a
                href="https://github.com/KodyHatcher"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                https://github.com/KodyHatcher
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-3">
              <FaEnvelope size={24} />
              <a
                href="mailto:kodyhatcher@gmail.com"
                className="hover:underline"
              >
                mailto:kodyhatcher@gmail.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-3">
              <FaPhone size={24} />
              <a href="tel:+14022978428" className="hover:underline">
                +1 (402) 297-8428
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send me a message
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 dark:text-gray-300">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
