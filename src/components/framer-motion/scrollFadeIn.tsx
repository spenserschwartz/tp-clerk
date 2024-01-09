import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollFadeInWrapperProps {
  children: ReactNode;
}

const variants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

const ScrollFadeInWrapper = ({ children }: ScrollFadeInWrapperProps) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={variants}>{children}</motion.div>
    </motion.div>
  );
};

export default ScrollFadeInWrapper;
