import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

function Model() {
  //const gltf = useGLTF("https://thinkuldeep.com/modelviewer/Astronaut.glb");
  //const gltf = useGLTF("/space_shuttle/scene.gltf");
  const gltf = useGLTF("/twlogo/twlogo.gltf");
  return <primitive object={gltf.scene} />;
}

const Box: React.FC = () => {
  const meshRef = useRef<any>(null);
  const [initialRotation] = useState(Math.PI / 4); // 45 degrees in radians

  useFrame(() => {
    const rotationSpeed = 0.01;
    const targetRotationY = window.scrollY * rotationSpeed;

    if (meshRef.current) {
      // Apply the initial local rotation to all axes and rotate the model around its local y-axis
      meshRef.current.rotation.set(
        initialRotation,
        initialRotation,
        initialRotation
      );
      meshRef.current.rotation.y = initialRotation + targetRotationY;
    }
  });

  return (
    <mesh scale={[1, 1, 1]} ref={meshRef} rotation={[0, initialRotation, 0]}>
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <Model />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const ThreeCube: React.FC = () => {
  return (
    <div
      className="absolute left-0 top-0 right-0 bottom-0 z-[-1] flex justify-center items-center"
      style={{ pointerEvents: "none" }}
    >
      <div className="w-1/2 h-1/2 lg:h-full lg:w-full">
        <Canvas>
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, -5]}
            castShadow
          />
          <Environment preset="city" blur={1} />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeCube;
