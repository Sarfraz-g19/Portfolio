"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchFromApi } from "@/lib/api";
import { Briefcase, Calendar } from "lucide-react";

interface Experience {
    _id: string;
    role: string;
    companyName: string;
    duration: string;
    description: string[];
}

export default function ExperienceSection() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await fetchFromApi("/experience");
                setExperiences(data || []);
            } catch (error) {
                console.error("Failed to fetch experience", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    if (loading) return null;

    return (
        <section id="experience" className="py-32 bg-background overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">Career</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Professional Experience</h3>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp._id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-8 md:pl-0"
                        >
                            <div className="md:grid md:grid-cols-5 gap-10">
                                {/* Date Column */}
                                <div className="hidden md:block col-span-1 text-right pt-2">
                                    <span className="text-sm font-mono text-muted-foreground whitespace-nowrap bg-card/50 px-3 py-1 rounded border border-white/5">
                                        {exp.duration}
                                    </span>
                                </div>

                                {/* Timeline Line */}
                                <div className="absolute left-0 md:left-[20%] top-2 bottom-0 w-px bg-white/10 md:translate-x-1/2">
                                    <div className="absolute top-0 -left-[5px] w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] ring-4 ring-background" />
                                </div>

                                {/* Content Column */}
                                <div className="col-span-4 pl-6 md:pl-12 pb-12">

                                    {/* Mobile Date */}
                                    <span className="md:hidden text-xs font-mono text-primary mb-2 block">
                                        {exp.duration}
                                    </span>

                                    <h4 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h4>
                                    <h5 className="text-lg text-primary/80 mb-6 flex items-center gap-2">
                                        <Briefcase size={16} /> {exp.companyName}
                                    </h5>

                                    <ul className="space-y-3">
                                        {exp.description?.map((point, pIdx) => (
                                            <li key={pIdx} className="flex gap-4 text-muted-foreground leading-relaxed">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
