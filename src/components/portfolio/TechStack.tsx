import React from "react";
import {
  GraphQLIcon,
  NextIcon,
  NodeIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "~/icons";

const iconClassName = "h-28 text-zinc-800 dark:text-purple-400 w-28";
const iconComponents = [
  TypeScriptIcon,
  ReactIcon,
  NodeIcon,
  TailwindIcon,
  NextIcon,
  GraphQLIcon,
];

const TechStack = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
        Tech Stack
      </h2>
      <div className="lg:order-first lg:row-span-2">
        <div className="mt-1 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>Just a few of the libraries and frameworks I use daily</p>
        </div>
      </div>
      <div></div>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {/* Map through iconComponents in order */}
        {iconComponents.map((Icon, index) => (
          <li key={`icon-${index}`}>
            <Icon iconClassName={iconClassName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
