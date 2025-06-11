import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

function Contact() {
  const [state, handleSubmit] = useForm("xrbkqejr"); // Replace with your own form ID

  return (
    <div className=" animated-gradient-bg min-h-screen rounded-2xl flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-10 py-20 max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-10 text-center">
        Get In Touch
      </h1>

      <div className="mb-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Connect with me</h2>
          <ul className="space-y-4 text-lg">
            {[
              {
                icon: <FaLinkedin size={24} />,
                href: "https://www.linkedin.com/in/kody-hatcher-a99768234",
                label: "linkedin.com/in/kody-hatcher-a99768234",
                colorClass: "text-white",
              },
              {
                icon: <FaGithub size={24} />,
                href: "https://github.com/KodyHatcher",
                label: "github.com/KodyHatcher",
                colorClass: "text-white",
              },
              {
                icon: <FaEnvelope size={24} />,
                href: "mailto:kodyhatcher@gmail.com",
                label: "kodyhatcher@gmail.com",
                colorClass: "text-white",
              },
              {
                icon: <FaPhone size={24} />,
                href: "tel:+14022978428",
                label: "+1 (402) 297-8428",
                colorClass: "text-white",
              },
            ].map(({ icon, href, label, colorClass }) => (
              <li
                key={label}
                className={`flex items-center justify-center md:justify-start space-x-3 cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-indigo-600`}
              >
                <span
                  className={`${colorClass} transition-colors duration-200`}
                >
                  {icon}
                </span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="dark:bg-gray-800 bg-white p-8 rounded-lg shadow-lg animate-fadeIn"
          noValidate
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send me a message
          </h2>

          {state.succeeded ? (
            <p className="text-green-500 text-center font-semibold">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          ) : (
            <>
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map(({ id, label, type }) => (
                <label key={id} htmlFor={id} className="block mb-6">
                  <span className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                    {label}
                  </span>
                  <input
                    id={id}
                    type={type}
                    name={id}
                    required
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      transition-shadow duration-300 shadow-sm"
                  />
                  {id === "email" && (
                    <ValidationError
                      prefix={label}
                      field={id}
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  )}
                </label>
              ))}

              <label htmlFor="message" className="block mb-6">
                <span className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Message
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 resize-none
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-shadow duration-300 shadow-sm"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-xs mt-1"
                />
              </label>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 hover:scale-105 duration-300 ease-in-out shadow-md transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Contact;
