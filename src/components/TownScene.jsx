import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b1727" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#112842" />
      </mesh>
    </group>
  );
}

function WaterBody({ position, size = [6, 0.1, 12] }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.material.emissiveIntensity = 0.2 + Math.sin(t * 1.5) * 0.05;
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
  });

  return (
    <mesh position={position} castShadow receiveShadow ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#0e6ba8" metalness={0.4} roughness={0.2} emissive="#16395a" emissiveIntensity={0.25} />
    </mesh>
  );
}

function Building({ position, size, color, emissive = '#203049' }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.4} emissive={emissive} emissiveIntensity={0.12} />
    </mesh>
  );
}

function Tower({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 6, 24]} />
        <meshStandardMaterial color="#3f6aa1" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 2.2, 24]} />
        <meshStandardMaterial color="#6bc4ff" emissive="#22446c" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Bridge({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.3, 2]} />
        <meshStandardMaterial color="#7687a2" metalness={0.4} roughness={0.45} />
      </mesh>
      {[ -3, 0, 3 ].map((x) => (
        <mesh key={x} position={[x, 1.4, -0.7]}>
          <cylinderGeometry args={[0.05, 0.05, 2.4, 12]} />
          <meshStandardMaterial color="#b5c8ff" emissive="#38557d" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {[ -3, 0, 3 ].map((x) => (
        <mesh key={`arch-${x}`} position={[x, 1.4, 0.7]}>
          <cylinderGeometry args={[0.05, 0.05, 2.4, 12]} />
          <meshStandardMaterial color="#b5c8ff" emissive="#38557d" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Dam({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2, 2]} />
        <meshStandardMaterial color="#8899ad" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.5, -1.1]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[7.5, 1.5, 0.2]} />
        <MeshTransmissionMaterial thickness={0.4} anisotropy={0.3} transmission={0.6} chromaticAberration={0.02} />
      </mesh>
      <WaterBody position={[0, -0.6, -1]} size={[6, 0.4, 3]} />
    </group>
  );
}

function PumpHouse({ position }) {
  return (
    <group position={position}>
      <Building position={[0, 1.2, 0]} size={[3, 2.4, 3]} color="#1d3c5f" emissive="#11263a" />
      <mesh position={[0, 2.6, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 1, 16]} />
        <meshStandardMaterial color="#6bc4ff" emissive="#204b75" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.8, 0.2, 1.8]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.6, 0.3, 0.6]} />
        <meshStandardMaterial color="#4cb5ab" />
      </mesh>
    </group>
  );
}

function Car({ pathRadius = 10, speed = 0.4, y = 0.3, color = '#ff6b6b', offset = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    const x = Math.cos(t) * pathRadius;
    const z = Math.sin(t) * pathRadius;
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.9, 0.5, 2]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} emissive="#341212" emissiveIntensity={0.4} />
    </mesh>
  );
}

function Plane({ radius = 20, speed = 0.08 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = 8 + Math.sin(t * 2) * 1.5;
    ref.current.position.set(x, y, z);
    ref.current.rotation.set(-Math.PI / 8, -t, 0);
  });

  return (
    <mesh ref={ref} castShadow>
      <coneGeometry args={[0.6, 2.5, 12]} />
      <meshStandardMaterial color="#f3ffad" emissive="#4c5130" emissiveIntensity={0.4} />
    </mesh>
  );
}

function Smoke({ position }) {
  const particles = useMemo(
    () => new Array(5).fill().map((_, i) => ({
      offset: i * 0.6,
      scale: 0.8 + i * 0.2,
    })),
    []
  );

  return (
    <group position={position}>
      {particles.map((particle, index) => (
        <Bubble key={index} {...particle} />
      ))}
    </group>
  );
}

function Bubble({ offset, scale }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset;
    const y = Math.sin(t) * 0.4 + offset * 0.6;
    const s = Math.sin(t * 0.6) * 0.1 + scale;
    ref.current.position.y = y;
    ref.current.scale.setScalar(Math.max(0.1, s));
    ref.current.material.opacity = 0.2 + (Math.sin(t * 0.5) + 1) * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, offset * 0.4, 0]}>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshStandardMaterial color="#d8f3ff" transparent opacity={0.3} />
    </mesh>
  );
}

function PowerPlant({ position }) {
  return (
    <group position={position}>
      <Building position={[0, 1.4, 0]} size={[4, 2.8, 4]} color="#1f2f46" emissive="#141f31" />
      <mesh position={[-1.5, 2.6, 1.2]}>
        <cylinderGeometry args={[0.6, 0.6, 2.4, 20]} />
        <meshStandardMaterial color="#758bbf" />
      </mesh>
      <mesh position={[1.5, 2.6, -1.2]}>
        <cylinderGeometry args={[0.6, 0.6, 2.4, 20]} />
        <meshStandardMaterial color="#758bbf" />
      </mesh>
      <Smoke position={[1.5, 4, -1.2]} />
      <Smoke position={[-1.5, 4, 1.2]} />
    </group>
  );
}

function WindTurbine({ position, height = 4 }) {
  const blades = useRef();
  useFrame((state) => {
    if (blades.current) {
      blades.current.rotation.y += state.clock.getDelta() * 4;
    }
  });

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, height, 8]} />
        <meshStandardMaterial color="#d6e9ff" />
      </mesh>
      <mesh position={[0, height / 2 + 0.2, 0]} ref={blades}>
        <boxGeometry args={[2.2, 0.12, 0.4]} />
        <meshStandardMaterial color="#eff6ff" emissive="#455a7a" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function TownScene() {
  return (
    <group rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
      <Ground />
      <Dam position={[-6, 0.5, -4]} />
      <Bridge position={[0, 0.8, 6]} />
      <WaterBody position={[-6, 0, -8]} size={[12, 0.3, 6]} />
      <PumpHouse position={[-2, 0.5, -2]} />
      <PowerPlant position={[5, 0.5, -3]} />
      <Tower position={[3, 0, 4]} />
      <WindTurbine position={[8, 2.4, 6]} />
      <WindTurbine position={[6, 2.4, 8]} />
      <WindTurbine position={[9, 2.4, 3]} />

      <Building position={[0, 1.5, 0]} size={[3, 3, 3]} color="#274264" emissive="#132033" />
      <Building position={[2.8, 0.9, -1.8]} size={[2.2, 1.8, 2.2]} color="#334f72" emissive="#1a2b43" />
      <Building position={[2.8, 1.5, 1.8]} size={[2.2, 3, 2.2]} color="#3a5a85" emissive="#1d2e47" />
      <Building position={[-3.2, 1.2, 2.2]} size={[2.6, 2.4, 2.6]} color="#2b4f71" emissive="#152c42" />

      <Car pathRadius={7} speed={0.35} color="#ff7a7a" />
      <Car pathRadius={9} speed={0.5} offset={Math.PI / 2} color="#5bffec" />
      <Car pathRadius={5} speed={0.28} offset={Math.PI} color="#ffe066" />

      <Plane />
    </group>
  );
}
