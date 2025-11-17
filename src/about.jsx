import { motion } from "framer-motion";
import { ts } from "./ts";

export default function About() {
  return (
    <section className="mb-16">
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
        20. Developer and CS student{" "}
        <a
          href="https://www.ubc.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          @UBC
        </a>
        .
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
        I like building software that works well and feels natural to use. Interested in distributed systems, full-stack development, and machine learning. Currently
        helping 100k students find internships with{" "}
        <a
          href="https://interninsider.me"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Intern Insider
        </a>.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
        When I'm not at the computer, I enjoy playing basketball, hiking the BC
        backcountry, and writing music.
      </p>
      <div className="mt-6">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          Technologies I've used:
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm">
          {ts.map((tech, i) => (
            <span key={i}>
              {tech.name}
              {i < ts.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
