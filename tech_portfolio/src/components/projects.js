import { motion } from "framer-motion";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import project_list from "./project_list";

function Projects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Projects
        </motion.h2>

        <div className="flex flex-col space-y-10">
          {project_list.map(({ id, title, description, tech, demo }, index) => (
            <motion.div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                  <FaCode />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {description}
                </p>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                  Tech used: {tech.join(", ")}
                </p>
              </div>

              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo <FaExternalLinkAlt />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
