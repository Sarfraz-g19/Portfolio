"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, Menu, X, Lock, Linkedin, Send, Github } from "lucide-react";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Qualification", href: "#qualification" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map(item => item.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "py-2 md:py-4 top-0 md:top-2 bg-transparent"
                    : "py-4 md:py-6 top-0 bg-transparent"
                    }`}
            >
                <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-300`}>
                    <div className={`flex items-center justify-between h-14 md:h-16 rounded-full px-4 md:px-6 ${scrolled
                        ? "bg-background/80 backdrop-blur-md border border-white/10 shadow-lg"
                        : "bg-background/20 backdrop-blur-sm border border-white/5"
                        }`}>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group z-50">
                            <div className="relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl overflow-hidden group-hover:bg-primary/20 transition-colors">
                                <Shield className="w-5 h-5 text-primary" />
                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="font-bold text-lg tracking-tight hidden sm:block">Sarfraj<span className="text-primary">.dev</span></span>
                        </Link>

                        {/* Desktop Nav - Absolute Center to keep it balanced */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-background/50 backdrop-blur-sm rounded-full p-1.5 border border-white/10 shadow-inner">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-4 py-2 text-xs font-medium transition-colors rounded-full ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3 z-50">
                            <a
                                href="https://github.com/Sarfraz-g19"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                                title="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sarfrajshah-cybersecurity/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-muted-foreground hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all"
                                title="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://t.me/Sarfraz0167"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-muted-foreground hover:text-[#229ED9] hover:bg-[#229ED9]/10 transition-all"
                                title="Telegram"
                            >
                                <Send size={18} />
                            </a>
                            <Link
                                href="/admin"
                                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                title="Admin Access"
                            >
                                <Lock size={18} />
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-foreground"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-28 px-6 md:hidden"
                >
                    <div className="flex flex-col gap-6 items-center text-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-foreground py-2 hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="w-12 h-px bg-border my-2" />
                        <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary"
                        >
                            <Lock size={18} /> Admin Panel
                        </Link>
                    </div>
                </motion.div>
            )}
        </>
    );
}
