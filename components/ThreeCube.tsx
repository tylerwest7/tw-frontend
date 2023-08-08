import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model() {
  //const gltf = useGLTF("https://thinkuldeep.com/modelviewer/Astronaut.glb");
  const gltf = useGLTF("/space_shuttle/scene.gltf");
  //const gltf = useGLTF("/sphere/sphere.gltf");
  return <primitive object={gltf.scene} />;
}

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
    <mesh scale={[0.1, 0.1, 0.1]} ref={meshRef}>
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <Model />
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
        <Box />
      </Canvas>
    </div>
  );
};

export default ThreeCube;
