import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./projectList";

const images = import.meta.glob("./assets/projects/*.{jpg,png}", {
  eager: true,
});

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {displayedProjects.map((project, i) => {
          const imagePath =
            images[`./assets/projects/${project.imageName}`]?.default;
          const originalIndex = projects.findIndex(p => p.title === project.title);
          const isAdditional = originalIndex >= 2;
          return (
            <motion.div
              key={project.title}
              className="flex flex-col h-full"
              initial={isAdditional ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: isAdditional ? (originalIndex - 2) * 0.1 : 0,
                ease: "easeOut"
              }}
            >
              <a
                href={project.href || project.github || "#"}
                target={project.href || project.github ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative block mb-3"
              >
                {imagePath ? (
                  <img
                    src={imagePath}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg border border-neutral-300 dark:border-neutral-700 group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-48 rounded-lg border border-neutral-300 dark:border-neutral-700 group-hover:opacity-80 transition-opacity" />
                )}
                <div className="absolute inset-0 bg-black/70 dark:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start p-4">
                  <p className="text-sm text-white leading-relaxed text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.description}
                  </p>
                </div>
              </a>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                {project.title}
              </h3>
              <div className="flex gap-4 text-sm text-neutral-500 dark:text-neutral-500 mt-auto">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline"
                  >
                    Link
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline"
                  >
                    Github
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
      {projects.length > 2 && !showAll && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => setShowAll(true)}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See more
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
