"use client";

import { ReactNode } from "react"; // Import ReactNode type
import { AnimatePresence, motion } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode; // Specify ReactNode type for children prop
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
