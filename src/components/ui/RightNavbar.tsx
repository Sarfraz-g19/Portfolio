"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "qualification", label: "Qualification" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

export default function RightNavbar() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
            {sections.map((section) => (
                <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="group relative flex items-center justify-end"
                >
                    <span className="absolute right-8 text-xs font-mono font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        {section.label}
                    </span>
                    <motion.div
                        animate={{
                            scale: activeSection === section.id ? 1.5 : 1,
                            backgroundColor: activeSection === section.id ? "var(--color-primary)" : "rgba(255, 255, 255, 0.2)"
                        }}
                        className="w-2 h-2 rounded-full ring-1 ring-transparent group-hover:ring-primary/50 transition-all duration-300"
                    />
                </Link>
            ))}
            <div className="absolute right-[3px] top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
        </nav>
    );
}
