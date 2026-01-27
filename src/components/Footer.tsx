import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-background border-t border-border relative overflow-hidden">
            {/* Cyber Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_20px_var(--color-primary)]"></div>

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-bold text-foreground tracking-tight">Sarfraj Shah</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Aspiring Cybersecurity Professional focused on Network Security, Penetration Testing, and Cloud Defense.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com/Sarfraz-g19" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/sarfrajshah-cybersecurity/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:sarfrazshah.cse@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Areas of Interest</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><span className="hover:text-primary transition-colors cursor-default">Penetration Testing</span></li>
                            <li><span className="hover:text-primary transition-colors cursor-default">SOC Operations</span></li>
                            <li><span className="hover:text-primary transition-colors cursor-default">Cloud Security</span></li>
                            <li><span className="hover:text-primary transition-colors cursor-default">Vulnerability Assessment</span></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Navigation</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#about" className="hover:text-primary transition-colors">About Me</Link></li>
                            <li><Link href="#projects" className="hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="#skills" className="hover:text-primary transition-colors">Skills</Link></li>
                            <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Bangalore, India
                            </li>
                            <li><a href="mailto:mohammadsarfraj2001@gmail.com" className="hover:text-primary break-all">mohammadsarfraj2001@gmail.com</a></li>
                            <li className="pt-2">
                                <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:underline">
                                    Let's Connect <ExternalLink size={14} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Mohammad Sarfraj Shah. Security First.</p>
                </div>
            </div>
        </footer>
    );
}
