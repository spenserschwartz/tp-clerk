import React from "react";
import NextIcon from "~/icons/Next";
import NodeIcon from "~/icons/Node";

const About = () => {
  return (
    <div className="lg:order-first lg:row-span-2">
      <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
        <p>
          I’ve loved making things for as long as I can remember, and I&apos;ve
          always thought of how to solve real world solutions with technology. I
          was drawn to the web at a young age, and I&apos;ve been building
          applications ever since.
        </p>
        <p>
          In my free time, I enjoy traveling and have developed an application
          to help others plan their perfect trip or vacation using artificial
          intelligence and machine learning. Please feel free to reach out to me
          if you have any questions or would like to collaborate!
        </p>
      </div>
      <NextIcon />
      <NodeIcon />
    </div>
  );
};

export default About;
