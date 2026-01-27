import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
    const Component = hoverEffect ? motion.div : 'div';

    const motionProps = hoverEffect ? {
        whileHover: { scale: 1.02, y: -5 },
        transition: { type: "spring", stiffness: 300 }
    } : {};

    return (
        // @ts-expect-error - motion.div and div props compatible enough for this usage
        <Component
            className={cn(
                "glass rounded-xl p-6 transition-colors duration-300",
                "bg-white/5 border border-white/10 backdrop-blur-md shadow-lg",
                "dark:bg-black/20 dark:border-white/5",
                hoverEffect && "hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-primary/20",
                className
            )}
            {...props}
            {...motionProps}
        >
            {children}
        </Component>
    );
}
