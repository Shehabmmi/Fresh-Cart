import React from "react";
import error from "../../assets/error.svg";

export default function Error404() {
  return (
    <section className="bg-white">
      <div className="flex items-center justify-center">
        <img src={error} alt="" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="mt-3 text-2xl text-black ">Page not found</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist.
        </p>
      </div>
    </section>
  );
}
