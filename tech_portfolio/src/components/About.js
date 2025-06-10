import React from "react";

function About({ scrollToProjects, scrollToContact }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-8">About Me</h1>

      <p className="text-lg mb-6 leading-relaxed">
        Hi! I’m Jane Doe, a passionate software developer with a love for
        building beautiful and functional web applications. I enjoy working with
        modern technologies and continuously learning new skills to improve my
        craft.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        With a background in computer science and several years of industry
        experience, I specialize in front-end development, UI/UX design, and
        creating responsive, accessible websites.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        When I’m not coding, I enjoy hiking, photography, and exploring new
        coffee shops. I believe in continuous growth, teamwork, and bringing
        positive energy to every project I work on.
      </p>

      <div className="mt-8 flex justify-center space-x-6">
        <button
          onClick={scrollToProjects}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          View My Projects
        </button>
        <button
          onClick={scrollToContact}
          className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Contact Me
        </button>
      </div>
    </div>
  );
}

export default About;
