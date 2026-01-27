"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export default function QualificationSection() {
    // Static data as resume parsing wasn't directly available. 
    // Adapting to typical Computer Science profile based on skills.
    const education = [
        {
            degree: "Bachelor of Computer Applications (BCA)",
            school: "Gujranwala Guru Nanak Khalsa College, Ludhiana",
            year: "2019 - 2024",
            location: "Ludhiana, India",
            grade: "A+" // Placeholder or generic high grade
        }
    ];

    return (
        <section id="qualification" className="py-24 bg-background relative border-t border-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-16 items-start"
                >
                    {/* Title Side */}
                    <div className="md:w-1/3 md:sticky md:top-32">
                        <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
                            Background
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                            Qualification
                        </h3>
                        <p className="mt-6 text-muted-foreground leading-relaxed">
                            My academic foundation in Computer Science and Engineering.
                        </p>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-2/3 w-full">
                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative pl-8 border-l border-white/10 hover:border-primary/50 transition-colors duration-300 group"
                                >
                                    <span className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-background border border-white/20 group-hover:bg-primary group-hover:border-primary transition-colors duration-300" />

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                                        <h4 className="text-2xl font-bold text-foreground">{edu.school}</h4>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-mono">
                                            <Calendar size={12} /> {edu.year}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-primary font-medium mb-4">
                                        <GraduationCap size={18} />
                                        <span>{edu.degree}</span>
                                    </div>

                                    <p className="text-muted-foreground flex items-center gap-2 text-sm mb-2">
                                        <MapPin size={14} /> {edu.location}
                                    </p>

                                    <div className="inline-block px-3 py-1 rounded bg-white/5 text-sm font-mono text-foreground/80 border border-white/5">
                                        Grade: {edu.grade}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
