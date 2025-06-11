import React from "react";
import { motion } from "framer-motion";
import { User, Mail, FolderGit2 } from "lucide-react";

function About({ scrollToProjects, scrollToContact }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-20">
      {/* About Box with animated gradient background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="animated-gradient-bg text-white px-10 py-12 rounded-2xl shadow-2xl max-w-4xl w-full text-center backdrop-blur-md"
      >
        <div className="flex justify-center items-center gap-3 mb-6">
          <User className="w-8 h-8 text-indigo-100" />
          <h1 className="text-5xl font-extrabold">About Me</h1>
        </div>

        <p className="text-lg mb-6 leading-relaxed">
          Hi! I’m <strong>Kody Hatcher</strong>, a student at the University of
          Nebraska at Omaha, double majoring in Cybersecurity and Artificial
          Intelligence with a minor in Computer Science. I'm passionate about
          building secure, intelligent software that solves real problems.
        </p>

        <p className="text-lg mb-6 leading-relaxed">
          Currently, I work as a{" "}
          <strong>Software Development Intern at Catholic Mutual Group</strong>,
          where I develop and maintain real-world applications with a focus on
          security and automation.
        </p>

        <p className="text-lg mb-6 leading-relaxed">
          Outside of tech, I enjoy <strong>golfing</strong>, spending time with
          friends, and pushing myself with new challenges. I believe in
          teamwork, curiosity, and staying optimistic no matter the obstacle.
        </p>

        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg shadow-md hover:bg-indigo-100 hover:scale-105 transition-all duration-300"
          >
            <FolderGit2 className="w-5 h-5" />
            View My Projects
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg shadow-md hover:bg-indigo-100 hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
