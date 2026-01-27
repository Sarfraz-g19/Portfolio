"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "next-themes";

function Stars(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    const { theme } = useTheme();
    const color = theme === 'dark' ? '#38BDF8' : '#2563EB';

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function TechRing() {
    const ref = useRef<any>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta / 5;
        }
    });

    const { theme } = useTheme();
    const color = theme === 'dark' ? '#22D3EE' : '#3B82F6';

    return (
        <points ref={ref}>
            <torusGeometry args={[1, 0.02, 16, 100]} />
            <pointsMaterial color={color} size={0.01} transparent opacity={0.5} />
        </points>
    )
}

export default function CyberModel() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
                <TechRing />
            </Canvas>
        </div>
    );
}
