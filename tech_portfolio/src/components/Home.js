import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
};

function Home({ scrollToProjects }) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-100 px-6 py-20 animated-gradient-bg"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left flex-1">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            variants={itemVariants}
          >
            Welcome to <span className="">My Portfolio</span>
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            Explore my projects, learn about my skills, and feel free to get in
            touch!
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-indigo-700 transition transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            variants={itemVariants}
          >
            View Projects
          </motion.button>
        </div>

        {/* Right: Image */}
        <motion.img
          //src="/image.jpeg"
          src="Headshot.png"
          alt="Filler"
          className="rounded-xl shadow-2xl max-w-full w-full sm:w-[300px] lg:w-[400px] h-auto"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    </motion.div>
  );
}

export default Home;
