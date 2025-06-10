import React from "react";

function Home({ scrollToProjects }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-20 text-center">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to My Portfolio</h1>
      <p className="text-xl max-w-xl mb-8">
        Explore my projects, learn about my skills, and feel free to get in
        touch!
      </p>
      <button
        onClick={scrollToProjects}
        className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
      >
        View Projects
      </button>
      <img
        src="/image.jpeg"
        alt="Filler"
        className="mt-10 rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
}

export default Home;
