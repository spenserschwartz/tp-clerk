import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ZoomInWrapperProps {
  children: ReactNode;
}

const ZoomInWrapper = ({ children }: ZoomInWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }} // Initial state (hidden and scaled down)
      animate={{ opacity: 1, scale: 1 }} // Animation state (zoom-in and fade-in)
      transition={{ duration: 0.5, delay: 0.5 }} // Duration of animation
    >
      {children}
    </motion.div>
  );
};

export default ZoomInWrapper;
