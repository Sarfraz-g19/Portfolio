"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full z-[9999] pointer-events-none mix-blend-difference"
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1500,
                    damping: 100,
                    mass: 0.1
                }}
            />
            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-primary/50 typeof-full z-[9998] pointer-events-none rounded-full"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 1 : 0.5,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 1
                }}
            />
        </>
    );
}
