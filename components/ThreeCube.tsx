import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Box: React.FC = () => {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    const rotationSpeed = 0.01;
    const targetRotation = window.scrollY * rotationSpeed;
    if (meshRef.current) {
      meshRef.current.rotation.y = targetRotation;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const ThreeCube: React.FC = () => {
  return (
    <div
      className="absolute left-0 top-0 right-0 bottom-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <Box />
      </Canvas>
    </div>
  );
};

export default ThreeCube;
