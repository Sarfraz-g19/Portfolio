"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Terminal, Code2, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchFromApi } from "@/lib/api";

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
    projectImage: string;
}

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Resume Data from 'Mohammad_Sarfraj_Shah_IT_Resume_WITH_LIVE_PROJECTS.pdf'
        const resumeProjects = [
            {
                _id: "p0",
                title: "Personal Portfolio",
                description: "My official developer portfolio. High-performance, animated, and fully responsive.",
                techStack: ["Next.js", "React", "Framer Motion"],
                githubLink: "https://github.com/Sarfraz-g19/Portfolio",
                liveLink: "https://portfolio-iqwf-git-main-portfoios-projects.vercel.app/",
                projectImage: "/projects/portfolio.png"
            },
            {
                _id: "p1",
                title: "Anand Engineers",
                description: "Corporate Website. Developed and maintained large-scale live production website.",
                techStack: ["WordPress", "SEO"],
                githubLink: "",
                liveLink: "https://anandengineers.in/",
                projectImage: "/projects/anand.png"
            },
            {
                _id: "p2",
                title: "GGS Public School",
                description: "Educational Website. Comprehensive platform for student information and academic resources.",
                techStack: ["React", "Node.js", "Web Development"],
                githubLink: "",
                liveLink: "https://ggsps.co.in/",
                projectImage: "/projects/ggs.png"
            },
            {
                _id: "p3",
                title: "Jack's Pizza Cafe",
                description: "Restaurant Website. Vibrant website featuring interactive menu and online ordering capabilities.",
                techStack: ["Next.js", "React", "Frontend"],
                githubLink: "",
                liveLink: "https://jackspizzacafe.in/",
                projectImage: "/projects/pizza.png"
            }
        ];
        setProjects(resumeProjects);
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <section id="projects" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-4">
                            Portfolio
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                            Featured Projects
                        </h3>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project._id}
                            variants={itemVars}
                            className="group relative h-full bg-card/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <motion.img
                                    src={project.projectImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-background/80 backdrop-blur rounded-full text-foreground hover:bg-primary hover:text-background transition-all"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-background/80 backdrop-blur rounded-full text-foreground hover:bg-primary hover:text-background transition-all"
                                        >
                                            <ArrowUpRight size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h4>
                                    <Terminal size={16} className="text-muted-foreground mt-1" />
                                </div>
                                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack?.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 rounded border border-primary/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute -inset-px rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
