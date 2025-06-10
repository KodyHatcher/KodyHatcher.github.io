import React from "react";

function About({ scrollToProjects, scrollToContact }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-8">About Me</h1>

      <p className="text-lg mb-6 leading-relaxed">
        Hi! I’m Kody Hatcher, a dedicated student at the University of Nebraska
        at Omaha, currently pursuing a double major in Cybersecurity and
        Artificial Intelligence with a minor in Computer Science. I'm passionate
        about technology and driven to make a meaningful impact through
        innovative software solutions.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        I’m currently working as a Software Development Intern at Catholic
        Mutual Group, where I gain hands-on experience building and maintaining
        real-world applications. My interests lie at the intersection of secure
        systems and intelligent automation.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        Outside of tech, I enjoy golfing, spending time with friends, and
        finding new ways to challenge myself. I believe in collaboration,
        curiosity, and bringing a positive mindset to every opportunity.
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
