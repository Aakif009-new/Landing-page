'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SolarPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshPhysicalMaterial
          color="#1a3a5c"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshPhysicalMaterial
          color="#2a5a8c"
          metalness={0.2}
          roughness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

function WindTurbine({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const bladeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z = state.clock.elapsedTime * 0.8
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 3, 8]} />
        <meshPhysicalMaterial color="#e5e5e5" metalness={0.5} roughness={0.3} />
      </mesh>
      <group ref={bladeRef} position={[0, 3, 0]}>
        <mesh position={[0, 0, 0]}>
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, 0, 0]}
            rotation={[0, 0, (i * Math.PI * 2) / 3]}
          >
            <boxGeometry args={[0.03, 0.8, 0.15]} />
            <meshPhysicalMaterial
              color="#f0f0f0"
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 8]} />
        <meshPhysicalMaterial color="#d4d4d4" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

function makeParticleGeometry(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5

    const color = new THREE.Color().setHSL(0.3 + Math.random() * 0.1, 0.6, 0.5 + Math.random() * 0.3)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = 0.02 + Math.random() * 0.04
  }

  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  return geom
}

function EnergyParticles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const [geometry] = useState(() => makeParticleGeometry(count))

  useFrame((state) => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.002
        pos[i * 3] += Math.cos(state.clock.elapsedTime * 0.15 + i * 0.5) * 0.002
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 20, '#1a3a1a', '#0f2a0f']}
      position={[0, -2, 0]}
    />
  )
}

function AmbientLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#34d399" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#10b981" />
      <hemisphereLight args={['#34d399', '#0a1a0a', 0.3]} />
    </>
  )
}

function CameraController() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mx = state.pointer.x * 0.3
    const my = state.pointer.y * 0.2

    state.camera.position.x = 4 + Math.sin(t * 0.08) * 1.5 + mx
    state.camera.position.y = 2 + my
    state.camera.position.z = 6 + Math.cos(t * 0.06) * 1 - mx * 0.3
    state.camera.lookAt(0, 0.5 + my * 0.1, 0)
  })

  return null
}

function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <AmbientLighting />
      <CameraController />
      <GridFloor />

      <SolarPanel position={[-2.5, -0.5, -1]} rotation={[0.1, 0.3, 0]} />
      <SolarPanel position={[-1, -0.3, 0.5]} rotation={[-0.05, -0.2, 0.05]} />
      <SolarPanel position={[1.5, -0.4, -0.5]} rotation={[0.08, -0.15, -0.03]} />
      {!isMobile && <SolarPanel position={[3, -0.6, 1]} rotation={[-0.03, 0.25, 0.02]} />}
      {!isMobile && <SolarPanel position={[-3.5, -0.2, 1.5]} rotation={[0.05, -0.3, -0.04]} />}

      <WindTurbine position={[-4, -1.5, -2]} scale={0.6} />
      {!isMobile && <WindTurbine position={[4.5, -1.5, -1.5]} scale={0.7} />}
      <WindTurbine position={[0, -1.5, -3.5]} scale={0.5} />

      <EnergyParticles count={isMobile ? 40 : 100} />
    </>
  )
}

export function HeroScene({ className }: { className?: string }) {
  const [isMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false)

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4, 2, 6], fov: 40 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
