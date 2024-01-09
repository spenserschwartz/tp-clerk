import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ZoomInUpWrapperProps {
  children: ReactNode;
}

const zoomInUpVariants = {
  initial: { scale: 0.5, opacity: 0, y: 100 }, // Start scaled down and below
  animate: {
    scale: 1, // Scale up to normal size
    opacity: 1, // Fade in to fully opaque
    y: 0, // Move up to final position
    transition: { type: "spring", stiffness: 100 },
  },
};

const ZoomInUpWrapper = ({ children }: ZoomInUpWrapperProps) => {
  return (
    <motion.div initial="initial" animate="animate" variants={zoomInUpVariants}>
      {children}
    </motion.div>
  );
};

export default ZoomInUpWrapper;
