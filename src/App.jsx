import { FaSun, FaMoon } from "react-icons/fa";
import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Wrapper from "./wrapper";
const Experiments = lazy(() => import("./experiments/experiments"));
const ThreeDCameraTest = lazy(() => import("./experiments/ThreeDCameraTest"));

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <BrowserRouter>
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </button>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route
          path="/experiments"
          element={
            <Suspense fallback={<div>Loading experiments…</div>}>
              <Experiments />
            </Suspense>
          }
        />
        <Route
          path="/experiments/3d-camera-test"
          element={
            <Suspense fallback={<div>Loading camera test…</div>}>
              <ThreeDCameraTest />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
