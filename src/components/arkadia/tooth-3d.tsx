"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * Стилизованный 3D-зуб.
 * Создаётся процедурно из нескольких геометрий:
 * - корона (верхняя часть) — модифицированная сфера
 * - 2 корня — вытянутые конусы
 *
 * Внешний вид: белый матовый, как настоящая эмаль.
 */

function ToothMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Лёгкое вращение
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08 - 0.05;
  });

  // Геометрия короны зуба — модифицированная сфера
  const crownGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(1, 32, 32);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Сжимаем по вертикали, делаем чуть более вытянутым вверх
      const newY = y * 1.1;

      // Нижняя часть — сужается (к шейке зуба)
      const taper = y < 0 ? 1 + y * 0.3 : 1;

      pos.setX(i, x * taper);
      pos.setY(i, newY);
      pos.setZ(i, z * taper);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Геометрия бугорков (4 бугорка наверху)
  const cuspGeometry = useMemo(() => {
    return new THREE.SphereGeometry(0.3, 16, 16);
  }, []);

  // Геометрия корня — конус
  const rootGeometry = useMemo(() => {
    return new THREE.ConeGeometry(0.35, 1.4, 16);
  }, []);

  // Материал — белый матовый, как эмаль
  const enamelMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#FFFFFF",
      roughness: 0.35,
      metalness: 0.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      reflectivity: 0.4,
      envMapIntensity: 0.8,
    });
  }, []);

  // Позиции бугорков
  const cuspPositions: [number, number, number][] = [
    [0.45, 0.85, 0.35],
    [-0.45, 0.85, 0.35],
    [0.45, 0.85, -0.35],
    [-0.45, 0.85, -0.35],
  ];

  return (
    <group ref={groupRef} scale={viewport.width < 5 ? 1.2 : 1.6}>
      {/* Корона зуба */}
      <mesh geometry={crownGeometry} material={enamelMaterial} />

      {/* Бугорки */}
      {cuspPositions.map((pos, i) => (
        <mesh
          key={`cusp-${i}`}
          geometry={cuspGeometry}
          material={enamelMaterial}
          position={pos}
          scale={[1, 0.6, 1]}
        />
      ))}

      {/* Корни — 2 штуки */}
      <mesh
        geometry={rootGeometry}
        material={enamelMaterial}
        position={[0.3, -1.0, 0]}
        rotation={[0, 0, -0.15]}
        scale={[0.7, 1, 0.7]}
      />
      <mesh
        geometry={rootGeometry}
        material={enamelMaterial}
        position={[-0.3, -1.0, 0]}
        rotation={[0, 0, 0.15]}
        scale={[0.7, 1, 0.7]}
      />
    </group>
  );
}

export function Tooth3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#A5B4FC" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#EEF2FF" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <ToothMesh />
      </Float>

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={10}
        blur={2.5}
        far={4}
        color="#1e1b4b"
      />

      <Environment preset="studio" />
    </Canvas>
  );
}
