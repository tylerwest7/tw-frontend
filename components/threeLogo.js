import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, N8AO, SSAO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  CuboidCollider,
} from "@react-three/rapier";

THREE.ColorManagement.legacyMode = false;

const logoMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  color: "black",
  envMapIntensity: 20,
});
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const baubles = [...Array(5)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
}));

function Bauble({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}) {
  const { nodes } = useGLTF("/twlogo/twlogo.gltf");
  const api = useRef();
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    if (api.current) {
      api.current.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiply({
            x: -50 * delta * scale,
            y: -150 * delta * scale,
            z: -50 * delta * scale,
          })
      );
    }
  });

  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const scrollThreshold = 100; // Adjust this value to your desired scroll threshold

      if (window.scrollY <= scrollThreshold) {
        // Ensure the scale doesn't go over 1
        meshRef.current.scale.x = Math.min(
          meshRef.current.scale.x + delta * 4,
          2
        );
        meshRef.current.scale.y = Math.min(
          meshRef.current.scale.y + delta * 4,
          2
        );
        meshRef.current.scale.z = Math.min(
          meshRef.current.scale.z + delta * 4,
          2
        );
      } else {
        // Ensure the scale doesn't go under 0
        meshRef.current.scale.x = Math.max(
          meshRef.current.scale.x - delta * 4,
          0
        );
        meshRef.current.scale.y = Math.max(
          meshRef.current.scale.y - delta * 4,
          0
        );
        meshRef.current.scale.z = Math.max(
          meshRef.current.scale.z - delta * 4,
          0
        );
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // Triggering a re-render on scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Inside the Bauble component
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
      dispose={null}
    >
      <CuboidCollider args={[scale, scale, scale]} />
      <mesh
        ref={meshRef}
        castShadow
        scale={2.5 * scale}
        position={[0, -0.4, 0]}
        geometry={nodes.OUT_Logo.geometry}
        material={logoMaterial}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();

  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      },
      0.2
    );
    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

export default function ThreeLogo() {
  return (
    <div
      id="3DLogo"
      className="fixed left-0 top-0 right-0 bottom-0 pointer-events-none"
    >
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {
            baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */
          }
        </Physics>
        <Environment preset="city" />
        <EffectComposer multisampling={0}>
          <N8AO color="red" aoRadius={2} intensity={1} />
          <SSAO />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
