import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextWordProps {
  text: string;
  classes: string;
}

const AnimatedTextWord: React.FC<AnimatedTextWordProps> = ({
  text,
  classes,
}) => {
  const words = text.split(" ");

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word.

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween", // Use tween for cubic-bezier transition
        ease: [0.65, 0, 0.35, 1], // Specify the cubic-bezier timing function
        duration: 1, // Set the duration to 1 second
      },
    },
    hidden: {
      opacity: 1,
      x: 0,
      y: -500,
      transition: {
        type: "tween", // Use tween for cubic-bezier transition
        ease: [0.65, 0, 0.35, 1], // Specify the cubic-bezier timing function
        duration: 1, // Set the duration to 1 second
      },
    },
  };

  return (
    <motion.div
      className={classes}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextWord;
