import React from "react";

export default function Error404() {
  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-8xl font-bold text-green-500">404 error</h1>
          <h1 className="mt-3 text-2xl text-black ">Page not found</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist.
          </p>
          <div className="flex items-center mt-6 gap-x-3"></div>
        </div>
      </div>
    </section>
  );
}
