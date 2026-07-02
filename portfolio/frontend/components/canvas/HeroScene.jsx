"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ─── Glowing Monitor ──────────────────────────────────────────────────────────
function Monitor({ position = [0, 0, 0], rotation = [0, 0, 0], width = 2, height = 1.2 }) {
  const screenRef = useRef();
  useFrame(({ clock }) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.15 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
    }
  });
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[width - 0.1, height - 0.1]} />
        <meshStandardMaterial
          color="#000820"
          emissive={new THREE.Color(0x0055ff)}
          emissiveIntensity={0.15}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
      {/* Code lines on screen (fake) */}
      {[0.3, 0.15, 0, -0.15, -0.3, -0.45].map((y, i) => (
        <mesh key={i} position={[-0.3 + (i % 3) * 0.05, y, 0.06]}>
          <planeGeometry args={[0.6 + Math.random() * 0.7, 0.03]} />
          <meshStandardMaterial
            color={['#00ff88', '#ff6b6b', '#ffd93d', '#00d4ff', '#c678dd', '#61afef'][i]}
            emissive={new THREE.Color(['#00ff88', '#ff6b6b', '#ffd93d', '#00d4ff', '#c678dd', '#61afef'][i])}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -height / 2 - 0.25, -0.05]}>
        <cylinderGeometry args={[0.03, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.45, -0.1]}>
        <boxGeometry args={[0.7, 0.04, 0.35]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function Keyboard({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.04, 0.55]} />
        <meshStandardMaterial color="#111122" roughness={0.7} metalness={0.5} />
      </mesh>
      {/* Key rows */}
      {[-0.18, -0.06, 0.06, 0.18].map((row, ri) =>
        Array.from({ length: 12 }).map((_, ki) => (
          <mesh key={`${ri}-${ki}`} position={[-0.66 + ki * 0.12, 0.035, row]}>
            <boxGeometry args={[0.09, 0.025, 0.09]} />
            <meshStandardMaterial
              color="#1a1a2e"
              emissive={new THREE.Color(ki % 4 === 0 ? '#ff00ff' : '#0033ff')}
              emissiveIntensity={0.4}
              metalness={0.6}
            />
          </mesh>
        ))
      )}
      {/* RGB underglow */}
      <pointLight position={[0, -0.05, 0]} color="#ff00ff" intensity={0.8} distance={0.8} />
    </group>
  );
}

// ─── Floating Orb (replaces Text, no WASM needed) ─────────────────────────────
function FloatingOrb({ position, color, speed = 1, size = 0.12 }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + offset) * 0.2;
    ref.current.rotation.x = clock.elapsedTime * 0.5;
    ref.current.rotation.y = clock.elapsedTime * 0.8;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={1.5} />
    </group>
  );
}

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField() {
  const count = 300;
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#0ea5e9'),
      new THREE.Color('#22c55e'),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

// ─── Desk Setup Scene ─────────────────────────────────────────────────────────
function DeskScene() {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Desk surface */}
      <mesh receiveShadow>
        <boxGeometry args={[6, 0.05, 2.5]} />
        <meshStandardMaterial color="#0d0d1a" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Desk edge glow strip */}
      <mesh position={[0, -0.82, 1.22]}>
        <boxGeometry args={[6, 0.02, 0.02]} />
        <meshStandardMaterial emissive={new THREE.Color('#7c3aed')} emissiveIntensity={2} />
      </mesh>

      {/* Main monitor */}
      <Monitor position={[-0.4, 0.3, -0.5]} rotation={[0, 0.05, 0]} width={2.2} height={1.35} />
      {/* Side monitor */}
      <Monitor position={[1.9, 0.2, -0.2]} rotation={[0, -0.35, 0]} width={1.5} height={1.0} />

      {/* Keyboard */}
      <Keyboard position={[-0.2, -0.82, 0.6]} />

      {/* Mouse */}
      <mesh position={[0.9, -0.84, 0.65]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.22]} />
        <meshStandardMaterial color="#1a1a2e" emissive={new THREE.Color('#00d4ff')} emissiveIntensity={0.4} />
      </mesh>

      {/* Developer mug */}
      <mesh position={[-2, -0.7, 0.3]}>
        <cylinderGeometry args={[0.12, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-2, -0.54, 0.3]}>
        <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
        <meshStandardMaterial color="#222" emissive={new THREE.Color('#884400')} emissiveIntensity={0.3} />
      </mesh>

      {/* Code. Build. Repeat. sign (glowing box) */}
      <mesh position={[2.5, 0.8, -0.9]}>
        <boxGeometry args={[0.8, 0.45, 0.05]} />
        <meshStandardMaterial color="#0d0d1a" emissive={new THREE.Color('#ffd700')} emissiveIntensity={0.8} roughness={0.3} />
      </mesh>

      {/* Headphones */}
      <mesh position={[2.2, -0.55, 0.1]} rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[0.18, 0.04, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#222" metalness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={2} color="#7c3aed" />
      <pointLight position={[5, 3, 3]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#0ea5e9" />

      {/* Desk */}
      <DeskScene />

      {/* Floating orbs (no Text/WASM dependency) */}
      <FloatingOrb position={[-3.5, 1.2, -1]} color="#61dafb" speed={0.8} size={0.14} />
      <FloatingOrb position={[3.2, 1.8, -1.5]} color="#339933" speed={1.1} size={0.11} />
      <FloatingOrb position={[-2.5, 2.2, -2]} color="#990000" speed={0.7} size={0.09} />
      <FloatingOrb position={[2.8, 0.6, -0.8]} color="#ffffff" speed={1.3} size={0.1} />
      <FloatingOrb position={[-4, 0.3, -1.5]} color="#ff9900" speed={0.9} size={0.13} />
      <FloatingOrb position={[0.5, 2.5, -2]} color="#c678dd" speed={1.0} size={0.1} />

      {/* Particles */}
      <ParticleField />

      {/* Interactive controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function HeroScene({ className }) {
  return (
    <div className={`w-full h-full${className ? ` ${className}` : ''}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 1.5, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
