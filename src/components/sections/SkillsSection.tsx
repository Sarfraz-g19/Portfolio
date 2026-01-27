"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchFromApi } from "@/lib/api";

interface Skill {
    skillName: string;
    proficiencyLevel: string;
    category: string;
}

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await fetchFromApi("/skills");
                if (data && data.length > 0) setSkills(data);
                else throw new Error("No data");
            } catch (error) {
                // Fallback Data if Fetch Fails
                setSkills([
                    { skillName: "Next.js", proficiencyLevel: "Advanced", category: "Frontend" },
                    { skillName: "React", proficiencyLevel: "Advanced", category: "Frontend" },
                    { skillName: "Tailwind CSS", proficiencyLevel: "Expert", category: "Frontend" },
                    { skillName: "Node.js", proficiencyLevel: "Intermediate", category: "Backend" },
                    { skillName: "MongoDB", proficiencyLevel: "Intermediate", category: "Backend" },
                    { skillName: "Penetration Testing", proficiencyLevel: "Advanced", category: "Security" },
                    { skillName: "Network Security", proficiencyLevel: "Advanced", category: "Security" },
                    { skillName: "Python", proficiencyLevel: "Advanced", category: "Languages" }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    // Group skills by category
    const categories = (skills || []).reduce((acc, skill) => {
        const cat = skill.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    if (loading) return null;

    return (
        <section id="skills" className="py-32 bg-background relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary">
                        Skills & Technologies
                    </h3>
                </div>

                <div className="grid gap-12 md:gap-16">
                    {Object.entries(categories).map(([category, items], catIdx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.1 }}
                        >
                            <h4 className="text-2xl font-bold text-foreground mb-8 border-l-4 border-primary pl-4">
                                {category}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {items.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        className="relative group bg-card/20 border border-white/5 p-4 rounded-xl hover:border-primary/50 transition-colors cursor-default overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity blur-lg" />
                                        <div className="relative z-10 text-center">
                                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {skill.skillName}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                                                {skill.proficiencyLevel}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
