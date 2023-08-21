import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

//Model setup
function setOrangeMaterial(node: Mesh): void {
  node.material = new MeshStandardMaterial({
    color: "white",
    toneMapped: true,
    metalness: 1,
    roughness: 0.1,
  });
}

// function rotateModel(node: Object3D): void {
//   node.rotation.x = Math.PI / 4; // Rotate about X-axis
//   node.rotation.y = -Math.PI / 1.7; // Rotate about X-axis
//   node.rotation.z = Math.PI; // Rotate about Z-axis
// }

function traverseModel(node: Object3D): void {
  if (node instanceof Mesh) {
    setOrangeMaterial(node);
  }
  //rotateModel(node);
  node.children.forEach(traverseModel);
}

function Model(): JSX.Element {
  const gltf = useGLTF("/twlogo/twlogo.gltf");

  traverseModel(gltf.scene);

  return <primitive object={gltf.scene.clone()} />;
}

//Render
const Box: React.FC = () => {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // meshRef.current.rotation.x = -Math.PI / 6;
      // meshRef.current.rotation.y = Math.PI / 6;
      // meshRef.current.rotation.z = Math.PI;
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh scale={[1, 1, 1]} ref={meshRef} castShadow receiveShadow>
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <Model />
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
        <Canvas camera={{ position: [0, 0, 3], fov: 35 }} shadows>
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
          <EffectComposer>
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeCube;
