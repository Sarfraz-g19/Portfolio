"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SystemBoot() {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setComplete(true);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#0B0F1A] flex flex-col items-center justify-center font-mono text-xs text-primary/80 pointer-events-none"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="w-64 space-y-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="h-0.5 bg-primary"
                        />
                        <div className="flex justify-between">
                            <span>INITIALIZING SYSTEM...</span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                _
                            </motion.span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground"
                        >
                            LOADING MODULES.
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-muted-foreground"
                        >
                            ESTABLISHING CONNECTION.
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-white"
                        >
                            ACCESS GRANTED.
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
