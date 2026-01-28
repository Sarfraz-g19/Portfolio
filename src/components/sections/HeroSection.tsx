"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { fetchFromApi } from "@/lib/api";
import CyberScene from "@/components/ui/CyberScene";

interface Profile {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    avatar: string;
    availableForHire: boolean;
}

export default function HeroSection() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isColored, setIsColored] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchFromApi("/profile");
                if (data) setProfile(data);
                else throw new Error("No data");
            } catch (error) {
                console.warn("Using fallback profile data");
                setProfile({
                    name: "Sarfraj Shah",
                    title: "Full Stack Developer & Cyber Security Analyst",
                    subtitle: "Crafting secure, scalable digital experiences.",
                    bio: "With over 1 year of professional experience and 10+ successfully delivered projects, I bridge the gap between secure backend architecture and dynamic frontend experiences.",
                    avatar: "https://github.com/Sarfraz-g19.png",
                    availableForHire: true
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="min-h-screen bg-background" />;

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative px-6 lg:px-20 overflow-hidden pt-20 lg:pt-0 bg-background text-foreground">
            {/* 3D Model Background */}
            <CyberScene />

            <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">

                {/* Left Side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                >
                    <div className="overflow-hidden">
                        {profile?.availableForHire && (
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                className="inline-block px-3 py-1 rounded-sm border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono tracking-[0.2em] uppercase mb-2 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                            >
                                SYSTEM ACTIVE // READY TO WORK
                            </motion.span>
                        )}
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1] md:leading-[1] uppercase italic break-words">
                        {profile?.name || "Sarfraj Shah"}
                    </h1>

                    <h2 className="text-xl md:text-2xl text-primary font-mono font-medium max-w-lg">
                        Cyber Security Intern | Full-Stack Developer | MERN & Next.js
                    </h2>

                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-light">
                        Specializing in secure admin dashboards, scalable systems, and real-world web applications. Bridging the gap between robust backend architecture and dynamic frontend experiences.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6 w-full">
                        <a
                            href="https://github.com/Sarfraz-g19"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group px-6 py-3 bg-primary text-background font-bold uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--color-primary)] rounded-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Github size={16} /> GITHUB
                            </span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sarfrajshah-cybersecurity/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group px-6 py-3 border border-foreground/20 text-foreground font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:border-[#0077b5] hover:text-[#0077b5] rounded-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Linkedin size={16} /> LINKEDIN
                            </span>
                        </a>
                        <a
                            href="https://t.me/Sarfraz0167"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group px-6 py-3 border border-foreground/20 text-foreground font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:border-[#229ED9] hover:text-[#229ED9] rounded-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Mail size={16} /> TELEGRAM
                            </span>
                        </a>
                    </div>
                </motion.div>

                {/* Right Side: Profile Image with 3D Tilt */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center lg:justify-end perspective-1000"
                >
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] group transition-transform duration-700 hover:rotate-2">
                        {/* Recursive Glow Layers */}
                        <div className="absolute inset-x-0 -inset-y-4 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute inset-y-0 -inset-x-4 bg-secondary/10 rounded-full blur-[80px] animate-pulse delay-700"></div>

                        {/* Main Image Frame (Cyber Style) */}
                        <div className="relative w-full h-full p-2 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 rounded-3xl overflow-hidden backdrop-blur-3xl border border-white/10 shadow-2xl">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary z-20"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary z-20"></div>

                            <div
                                className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-1000 bg-black cursor-pointer ${isColored ? "grayscale-0" : "grayscale hover:grayscale-0"}`}
                                onClick={() => setIsColored(!isColored)}
                            >
                                <img
                                    src={profile?.avatar || "https://github.com/Sarfraz-g19.png"}
                                    alt={profile?.name || "Profile"}
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>

                            {/* Scanning HUD Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-primary/50 shadow-[0_0_15px_var(--color-primary)] z-20"
                            />
                        </div>

                        {/* Floating Status Decal */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute -left-6 top-1/4 bg-background/80 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-2xl hidden md:block"
                        >
                            <p className="text-[10px] font-mono text-primary uppercase mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                                <span className="text-xs font-bold font-mono">ENCRYPTED // ONLINE</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce hidden md:block"
            >
                <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
            </motion.div>
        </section>
    );
}
