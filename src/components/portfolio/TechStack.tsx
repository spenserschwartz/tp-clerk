import React from "react";
import { NextIcon, NodeIcon, ReactIcon, TypeScriptIcon } from "~/icons";

const iconClassName = "h-28 text-zinc-800 dark:text-purple-400 ";

const TechStack = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
        Tech Stack
      </h2>
      <div></div>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        <li>
          <TypeScriptIcon iconClassName={iconClassName} />
        </li>
        <li>
          <ReactIcon iconClassName={iconClassName} />
        </li>

        <li>
          <NodeIcon iconClassName={iconClassName} />
        </li>
        <li>
          <NextIcon iconClassName={iconClassName} />
        </li>
      </ul>
    </div>
  );
};

export default TechStack;

// <li>
// <img
//     src="/logos/react.svg"
//     alt="React"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
// <li>
// <img
//     src="/logos/nextjs.svg"
//     alt="Next.js"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
// <li>
// <img
//     src="/logos/tailwindcss.svg"
//     alt="Tailwind CSS"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
// <li>
// <img
//     src="/logos/nodejs.svg"
//     alt="Node.js"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
// <li>
// <img
//     src="/logos/express.svg"
//     alt="Express"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
// <li>
// <img
//     src="/logos/mongodb.svg"
//     alt="MongoDB"
//     unoptimized
//     fill
//     className="rounded-full"
// />
// </li>
