"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function ContactPage() {
    return (
        <div className="py-10 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
            <GlassCard className="p-8">
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:ring-primary focus:border-primary" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:ring-primary focus:border-primary" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:ring-primary focus:border-primary h-32" placeholder="How can I help you?"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-opacity">
                        Send Message
                    </button>
                </form>
            </GlassCard>
        </div>
    );
}
