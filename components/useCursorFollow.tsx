import React, { useState, useEffect } from "react";

interface CursorFollowerProps {
  size: number;
  hovering: boolean;
}

const useCursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

const CursorFollower: React.FC<CursorFollowerProps> = ({ size, hovering }) => {
  const cursorPosition = useCursorFollower();
  const cursorSize = 50;

  //translate scale instead

  return (
    <div
      className="rounded-full pointer-events-none hidden lg:flex flex items-center"
      style={{
        zIndex: 998,
        position: "fixed",
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: "white",
        left: cursorPosition.x - cursorSize / 2 + "px",
        top: cursorPosition.y - cursorSize / 2 + "px",
        transform: `scale(${size})`, // Add scale transform
        transition: "transform 0.2s cubic-bezier(0.65, 0, 0.35, 1)",
      }}
    >
      <h1
        style={{
          zIndex: 999,
          opacity: hovering ? "100" : "0",
          transition: "opacity 0.2s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
        className="text-black text-center leading-none text-[0.5rem] w-full tracking-normal"
      >
        View project
      </h1>
    </div>
  );
};

export default CursorFollower;
