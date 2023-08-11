import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { BufferGeometry, Mesh, Material } from "three";
import { OrbitControls, Plane } from "@react-three/drei";

const Cube: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [ref, api] = useBox(() => ({ mass: 1, position }));

  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log("Hello");
    }, 1000);

    return () => clearTimeout(timer);
  }, [api]);

  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref as React.MutableRefObject<Mesh<BufferGeometry, any>>}
    >
      <boxGeometry args={[1, 1, 1]} />
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
      <meshStandardMaterial color="black" />
    </Plane>
  );
};

interface threeProps {
  threeVisible: boolean;
}

const App: React.FC<threeProps> = ({ threeVisible }) => {
  const [customGravity, setCustomGravity] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log("Hello");
      //setCustomGravity(-30);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (threeVisible) {
      //console.log("threeVisible is true");
      setCustomGravity(-30);
    } else {
      //console.log("threeVisible is false");
      setCustomGravity(0);
    }
  }, [threeVisible]); // Add threeVisible to the dependency array

  return (
    <div className="left-0 top-0 right-0 bottom-0 absolute z-[-1]">
      <Canvas camera={{ position: [0, 0, 2], fov: 120 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, customGravity, 0]}>
          <Cube position={[0, 5, 0]} />
          <PlaneWithPhysics position={[0, -2, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;
