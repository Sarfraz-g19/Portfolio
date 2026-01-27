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
        // Resume Data from 'Mohammad_Sarfraj_Shah_IT_Resume_WITH_LIVE_PROJECTS.pdf' - EXACT MATCH
        const resumeSkills = [
            // Programming Languages
            { skillName: "C", category: "Programming Languages", proficiencyLevel: "Intermediate" },
            { skillName: "C++", category: "Programming Languages", proficiencyLevel: "Intermediate" },
            { skillName: "Java", category: "Programming Languages", proficiencyLevel: "Advanced" },
            { skillName: "Python", category: "Programming Languages", proficiencyLevel: "Advanced" },
            { skillName: "JavaScript", category: "Programming Languages", proficiencyLevel: "Advanced" },
            { skillName: "PHP", category: "Programming Languages", proficiencyLevel: "Intermediate" },
            { skillName: "Bash", category: "Programming Languages", proficiencyLevel: "Intermediate" },
            { skillName: "SQL", category: "Programming Languages", proficiencyLevel: "Intermediate" },

            // Frontend
            { skillName: "HTML5", category: "Frontend", proficiencyLevel: "Expert" },
            { skillName: "CSS3", category: "Frontend", proficiencyLevel: "Expert" },
            { skillName: "Bootstrap", category: "Frontend", proficiencyLevel: "Advanced" },
            { skillName: "React.js", category: "Frontend", proficiencyLevel: "Advanced" },

            // Cyber Security Tools
            { skillName: "Burp Suite", category: "Cyber Security Tools", proficiencyLevel: "Advanced" },
            { skillName: "Nmap", category: "Cyber Security Tools", proficiencyLevel: "Expert" },
            { skillName: "Nessus", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },
            { skillName: "Metasploit", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },
            { skillName: "Nikto", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },
            { skillName: "Wireshark", category: "Cyber Security Tools", proficiencyLevel: "Advanced" },
            { skillName: "SQLmap", category: "Cyber Security Tools", proficiencyLevel: "Advanced" },
            { skillName: "OWASP ZAP", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },
            { skillName: "Hydra", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },
            { skillName: "Netcat", category: "Cyber Security Tools", proficiencyLevel: "Intermediate" },

            // Cloud & DevOps
            { skillName: "AWS (EC2)", category: "Cloud & DevOps", proficiencyLevel: "Intermediate" },
            { skillName: "Docker", category: "Cloud & DevOps", proficiencyLevel: "Intermediate" },
            { skillName: "Jenkins", category: "Cloud & DevOps", proficiencyLevel: "Intermediate" },
            { skillName: "Git/GitHub", category: "Cloud & DevOps", proficiencyLevel: "Advanced" },
            { skillName: "CI/CD", category: "Cloud & DevOps", proficiencyLevel: "Intermediate" },

            // Development Tools (New Category)
            { skillName: "VS Code", category: "Development Tools", proficiencyLevel: "Advanced" },
            { skillName: "IntelliJ", category: "Development Tools", proficiencyLevel: "IDEs" },
            { skillName: "PyCharm", category: "Development Tools", proficiencyLevel: "IDEs" },
            { skillName: "Android Studio", category: "Development Tools", proficiencyLevel: "IDEs" },
            { skillName: "MySQL", category: "Development Tools", proficiencyLevel: "Database" },
            { skillName: "XAMPP", category: "Development Tools", proficiencyLevel: "Tools" },

            // Operating Systems (New Category)
            { skillName: "Windows", category: "Operating Systems", proficiencyLevel: "Advanced" },
            { skillName: "Linux", category: "Operating Systems", proficiencyLevel: "Expert" }
        ];
        setSkills(resumeSkills);
        setLoading(false);
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
