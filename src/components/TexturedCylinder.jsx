import { useRef,useState, } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

import * as THREE from "three";
export const TexturedCylinder = ({img}) => {
  const { viewport } = useThree();
  const [ stop, setStop ] = useState(false);
  const cyRef = useRef(null);
  let tex = useTexture(img);
  useFrame((state, delta) => {
    if (!cyRef.current || stop) return;
    cyRef.current.rotation.y += delta;
  });
  return (
    <group rotation={[0.3, 0, 0.2]}>
      <mesh
        ref={cyRef}
        scale={viewport.width < 6 ? 0.55 : 1}
        onPointerEnter={() => {
          setStop(true);
        }}
        onPointerLeave={() => {
          setStop(false);
        }}
      >
        <cylinderGeometry args={[2, 2, 1.5, 30, 30, true]} />
        <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};