import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";
import { BufferGeometry, Mesh, Material } from "three";
import { Environment, Plane } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";

function Model({ url }: { url: string }) {
  const [model, setModel] = useState<Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      setModel(gltf.scene.clone());
    });
  }, [url]);

  if (!model) return null;

  return <primitive object={model} />;
}
const Cube: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [ref, api] = useBox(() => ({ mass: 1, position, type: "Dynamic" }));

  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log("Hello");
    }, 1000);

    return () => clearTimeout(timer);
  }, [api]);

  return (
    <mesh
      scale={[0.2, 0.2, 0.2]}
      castShadow
      receiveShadow
      ref={ref as React.MutableRefObject<Mesh<BufferGeometry, any>>}
    >
      <Model url="/twlogo/twlogo.gltf" />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const PlaneWithPhysics: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    position,
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <Plane
      args={[1000, 1000]}
      ref={ref as React.MutableRefObject<Mesh<BufferGeometry, Material[]>>}
    >
      <meshStandardMaterial color="black" transparent opacity={0} />
    </Plane>
  );
};

interface threeProps {
  threeVisible: boolean;
}

const App: React.FC<threeProps> = ({ threeVisible }) => {
  const [customGravity, setCustomGravity] = useState<number>(0);

  useEffect(() => {
    if (threeVisible) {
      setCustomGravity(-30);
    } else {
      setCustomGravity(0);
    }
  }, [threeVisible]);

  const cubePositions: [number, number, number][] = Array.from(
    { length: 12 },
    () => [
      Math.random() * 3 - 1.5, // Random x position between -1.5 and 1.5
      Math.random() * 3, // Random y position between 0 and 3
      Math.random() * 3 - 1.5, // Random z position between -1.5 and 1.5
    ]
  );

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1], fov: 80 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, customGravity, 0]}>
          {cubePositions.map((position, index) => (
            <Cube key={index} position={position} />
          ))}
          <PlaneWithPhysics position={[0, -2, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;
