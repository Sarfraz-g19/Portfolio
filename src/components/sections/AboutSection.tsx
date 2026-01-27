"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchFromApi } from "@/lib/api";
import { User, Code, Heart } from "lucide-react";

interface Profile {
    bio: string;
}

export default function AboutSection() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchFromApi("/profile");
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Visual / Image Side (or stylized text) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
                            Discover
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 mb-8">
                            About Me.
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-card/30 backdrop-blur border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
                                <Code className="w-8 h-8 text-secondary mb-4" />
                                <h4 className="text-2xl font-bold">Full Stack</h4>
                                <p className="text-sm text-muted-foreground mt-2">Engineering robust & scalable solutions.</p>
                            </div>
                            <div className="p-6 bg-card/30 backdrop-blur border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
                                <User className="w-8 h-8 text-primary mb-4" />
                                <h4 className="text-2xl font-bold">CyberSec</h4>
                                <p className="text-sm text-muted-foreground mt-2">Securing digital assets & infrastructure.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-muted-foreground leading-relaxed space-y-6"
                    >
                        <div className="p-8 bg-card/10 border border-white/5 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-3xl" />
                            <div className="relative z-10">
                                {profile?.bio ? (
                                    <p className="whitespace-pre-wrap font-light">{profile.bio}</p>
                                ) : (
                                    <p>Loading bio encryption...</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="h-1 w-20 bg-primary/50 rounded-full" />
                            <div className="h-1 w-10 bg-secondary/50 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
