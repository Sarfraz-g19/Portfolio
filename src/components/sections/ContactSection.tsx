"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-card/20 to-transparent border border-white/10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Have an idea?</h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        I am always looking for new challenges and opportunities. Let's discuss how we can build something amazing together.
                    </p>

                    <a
                        href="mailto:mohammadsarfraj2001@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-bold rounded-full hover:shadow-[0_0_40px_var(--color-primary)] hover:scale-105 transition-all duration-300"
                    >
                        Start a Conversation <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
