import React, { useRef, useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Projects from "./components/projects";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;

    if (savedTheme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        html.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const newMode = html.classList.contains("dark");
    setIsDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
        isDark ? "bg-indigo-700" : "bg-yellow-400"
      }`}
    >
      <span
        className={`
          absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md
          flex items-center justify-center text-xs transition-transform duration-300
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <FaMoon className="text-indigo-700" />
        ) : (
          <FaSun className="text-yellow-500" />
        )}
      </span>
    </button>
  );
}

function App() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <nav className="flex flex-wrap justify-center gap-2 md:space-x-4 py-4 sticky top-0 bg-white dark:bg-gray-900 z-40 shadow">
        <button
          onClick={scrollToHome}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Home
        </button>
        <button
          onClick={scrollToProjects}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Projects
        </button>
        <button
          onClick={scrollToAbout}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          About
        </button>
        <button
          onClick={scrollToContact}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Contact
        </button>
        <a
          href="/KodyHatcherResumeMain.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Resume
        </a>

        {/* Add Dark Mode Toggle here */}
        <DarkModeToggle />
      </nav>

      <section ref={homeRef} className="scroll-mt-24">
        <Home scrollToProjects={scrollToProjects} />
      </section>

      <section ref={projectsRef} className="scroll-mt-24">
        <Projects />
      </section>

      <section ref={aboutRef} className="scroll-mt-24">
        <About
          scrollToProjects={scrollToProjects}
          scrollToContact={scrollToContact}
        />
      </section>

      <section ref={contactRef} className="scroll-mt-24">
        <Contact />
      </section>
    </div>
  );
}

export default App;
