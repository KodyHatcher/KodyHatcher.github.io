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

        <motion.div
          className="flex flex-col space-y-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {project_list.map(({ id, title, description, tech, demo }) => (
            <motion.div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                  },
                },
              }}
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
                  Tech Stack: {tech.join(", ")}
                </p>
              </div>

              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-indigo-700 transition transform duration-300 inline-flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo <FaExternalLinkAlt className="ml-1" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;
