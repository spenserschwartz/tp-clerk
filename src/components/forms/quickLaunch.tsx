import React from "react";

const QuickLaunchForm = () => {
  return (
    <div className="mx-auto w-full md:w-96 md:max-w-full">
      <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
        <form method="POST" action="https://herotofu.com/start">
          <label className="mb-6 block">
            <span className="text-gray-300">Your name</span>
            <input
              name="name"
              type="text"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Joe Bloggs"
            />
          </label>
          <label className="mb-6 block">
            <span className="text-gray-300">Email address</span>
            <input
              name="email"
              type="email"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="joe.bloggs@example.com"
            />
          </label>
          <label className="mb-6 block">
            <span className="text-gray-300">When is your birthday?</span>
            <input
              name="birthday"
              type="date"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="mb-6 block">
            <span className="text-gray-300">
              What kind of present you expect this year?
            </span>
            <select
              name="present"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Chocolate cake</option>
              <option>Dancing cat</option>
              <option>Custom meme about me</option>
              <option>Zoom backgrounds for the rest of my life</option>
            </select>
          </label>
          <div className="mb-6">
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    name="season"
                    type="radio"
                    className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-gray-300">I like summer</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    name="season"
                    type="radio"
                    className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-gray-300">
                    I am more into winter
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="focus:shadow-outline h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800"
            >
              Send Answers
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickLaunchForm;
