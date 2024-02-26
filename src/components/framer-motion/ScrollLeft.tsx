import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollLeftWrapperProps {
  children: ReactNode;
}

const variants: Variants = {
  offscreen: {
    x: "-100vw", // Start 100px to the left of the screen
    opacity: 0,
  },
  onscreen: {
    x: 0, // Move to its original position
    opacity: 1,
    transition: {
      delay: 0.3, // Delay the animation by 0.3 seconds
      type: "spring",
      stiffness: 50, // Lower stiffness makes the spring effect more pronounced
      damping: 8, // Higher damping slows down the motion
      mass: 1, // Mass of the moving object, adjust if needed for effect
      duration: 2, // Optionally, you can specify the duration (in seconds)
    },
  },
};

const ScrollLeftWrapper = ({ children }: ScrollLeftWrapperProps) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={variants}>{children}</motion.div>
    </motion.div>
  );
};

export default ScrollLeftWrapper;
