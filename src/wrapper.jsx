import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import About from "./about";
import WorkExperiences from "./workExperiences";
import Projects from "./project";

export default function Wrapper() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-2xl md:text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Alan Zhou
          </motion.h1>
          <motion.p
            className="text-neutral-600 dark:text-neutral-400 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Software Engineer
          </motion.p>
        </motion.header>

        <About />
        <Projects />
        <WorkExperiences />
        <motion.footer
          className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Links
          </p>
          <div className="flex flex-col space-y-1 text-sm">
            <motion.a
              href="https://github.com/alantensor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Github
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/therealalan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://twitter.com/weenislickers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Twitter/X
            </motion.a>
            <motion.a
              href="https://news.ycombinator.com/user?id=alantensor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Hacker News
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
