import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextCharacterProps {
  text: string;
}

const AnimatedTextCharacter: React.FC<AnimatedTextCharacterProps> = ({
  text,
}) => {
  // Splitting text into letters
  const letters = Array.from(text);

  // Variants for Container
  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  // Variants for each letter
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
      y: 500,
      transition: {
        type: "tween", // Use tween for cubic-bezier transition
        ease: [0.65, 0, 0.35, 1], // Specify the cubic-bezier timing function
        duration: 1, // Set the duration to 1 second
      },
    },
  };

  return (
    <motion.div
      className="overflow-hidden flex text-2xl lg:text-9xl pb-4 font-medium"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextCharacter;
