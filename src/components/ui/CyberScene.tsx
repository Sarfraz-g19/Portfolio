"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles({ count = 1000 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null!);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
            ref.current.rotation.x += 0.0005;
        }
    });

    return (
        <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function CyberCore() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = time * 0.2;
        meshRef.current.rotation.z = time * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>
        </Float>
    );
}

export default function CyberScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00ff9d" />

                <CyberCore />
                <FloatingParticles count={2000} />
            </Canvas>
        </div>
    );
}
