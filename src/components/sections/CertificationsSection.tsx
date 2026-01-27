"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchFromApi } from "@/lib/api";

interface Certification {
    _id: string;
    title: string;
    issuer: string;
    date: string;
    verified: boolean;
}

export default function CertificationsSection() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const data = await fetchFromApi("/certifications");
                setCertifications(data || []);
            } catch (error) {
                console.error("Failed to fetch certifications", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    if (loading) return null;

    return (
        <section id="certifications" className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-secondary font-mono text-sm tracking-widest uppercase mb-4">Credentials</h2>
                    <h3 className="text-4xl font-bold">Certifications & Awards</h3>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={cert._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-card/20 border border-white/5 rounded-xl p-6 hover:bg-card/40 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 group-hover:text-primary transition-colors">
                                    <Award size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cert.title}</h4>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">{cert.issuer}</p>

                                    <div className="flex items-center gap-2 text-xs font-mono">
                                        <div className={`px-2 py-0.5 rounded border ${cert.verified
                                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                                            : "bg-white/5 border-white/10 text-muted-foreground"
                                            }`}>
                                            {cert.verified ? "VERIFIED" : "COMPLETED"}
                                        </div>
                                        <span className="text-muted-foreground/50">|</span>
                                        <span className="text-muted-foreground">{cert.date}</span>
                                    </div>
                                </div>
                            </div>

                            {cert.verified && (
                                <div className="absolute top-4 right-4 text-green-500/20 group-hover:text-green-500/50 transition-colors">
                                    <ShieldCheck size={40} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
