import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TexturedCylinder } from '../components/TexturedCylinder';

const Bhawna = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-dvh bg-neutral-500 m-0">
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <OrbitControls />
        <ambientLight intensity={2} />
        <TexturedCylinder img="/images/bhawna.png" />
      </Canvas>
    </div>
  );
};

export default Bhawna;
