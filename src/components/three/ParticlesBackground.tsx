'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function makePositions(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30
  }
  return positions
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 60
  const [geometry] = useState(() => {
    const positions = makePositions(count)
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.001
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#34d399"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function ParticlesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  )
}
