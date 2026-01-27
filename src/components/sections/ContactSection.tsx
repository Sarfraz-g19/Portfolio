"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Side: Text */}
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Let's Connect & <br /> <span className="text-primary">Start Conversation</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Available for new projects</span>
                        </div>

                        <div className="pt-4">
                            <a href="mailto:mohammadsarfraj2001@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline">
                                <Mail size={16} /> mohammadsarfraj2001@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-card/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                                <input
                                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={e => setForm({ ...form, subject: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                placeholder="Your Message..."
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                required
                            />

                            <button
                                disabled={loading}
                                className="w-full bg-primary text-background font-bold py-4 rounded-xl hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                            </button>

                            {status === "success" && (
                                <p className="text-green-500 text-center text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                                    Message sent successfully! I'll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-destructive text-center text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
