import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const experiments = [
  {
    title: "3D Camera Test",
    status: "Playable demo",
    summary:
      "Early exploration of projection math and first-person movement using the HTML canvas API. Arrow keys move, space/shift fly, and yaw pivots with the left/right keys.",
    stack: ["Canvas 2D", "JavaScript"],
    link: "/experiments/3d-camera-test",
  },
];

export default function Experiments() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          className="mb-10 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex w-full items-center justify-between mb-2">
            <p className="text-xl">Experiments</p>
            <Link
              to="/"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4"
            >
              ← Home
            </Link>
          </div>
        </motion.div>

        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-12">
          Weekend builds, shader doodles, and tooling spikes that may or may not
          make it into the main portfolio.
        </p>

        <div className="space-y-8">
          {experiments.map((experiment, index) => (
            <motion.article
              key={experiment.title}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white/60 dark:bg-white/5 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium">{experiment.title}</h2>
                <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {experiment.status}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {experiment.summary}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                {experiment.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {experiment.link.startsWith("/") ? (
                <Link
                  to={experiment.link}
                  className="text-sm text-neutral-700 dark:text-neutral-200 hover:underline underline-offset-4"
                >
                  Open experiment
                </Link>
              ) : (
                <a
                  href={experiment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-700 dark:text-neutral-200 hover:underline underline-offset-4"
                >
                  View build notes
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
