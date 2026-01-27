"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { BarChart3, Box, FileText, LayoutDashboard, Settings, Shield, Users, Plus, Trash2, CheckCircle, XCircle, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const [activeTab, setActiveTab] = useState("overview");

    // Verify Admin Email Clientside (Backend does the real check)
    const isAdmin = user?.emailAddresses.some(e => e.emailAddress.toLowerCase().trim() === "mohammadsarfraj2001@gmail.com");

    if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading Security Protocols...</div>;

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground bg-grid-pattern">
                <Shield size={64} className="text-destructive mb-4" />
                <h1 className="text-3xl font-bold mb-2">ACCESS DENIED</h1>
                <p className="text-muted-foreground mb-8">Your identity does not match the authorized command profile.</p>
                <Link href="/" className="btn-outline">Return to Safety</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg tracking-wider">SECURE <span className="text-primary">ADMIN</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<Mail size={20} />} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
                    <NavItem icon={<Box size={20} />} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
                    <NavItem icon={<BarChart3 size={20} />} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
                    <NavItem icon={<FileText size={20} />} label="Certificates" active={activeTab === 'certs'} onClick={() => setActiveTab('certs')} />
                    <NavItem icon={<Users size={20} />} label="Experience" active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-lg">
                        <UserButton afterSignOutUrl="/" />
                        <div className="text-xs">
                            <p className="font-medium text-foreground truncate max-w-[120px]">{user?.fullName}</p>
                            <p className="text-muted-foreground text-[10px]">Command Access</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground capitalize">{activeTab}</h1>
                        <p className="text-muted-foreground">System Operational. Threat Level: Low.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/10 px-3 py-1 rounded border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            SECURE CONNECTION
                        </span>
                        <div className="md:hidden">
                            <UserButton />
                        </div>
                    </div>
                </header>

                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'messages' && <MessagesManager />}
                {activeTab === 'projects' && <ProjectsManager />}
                {activeTab === 'skills' && <SkillsManager />}
                {activeTab === 'certs' && <CertificatesManager />}
                {activeTab === 'experience' && <ExperienceManager />}
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-secondary/10 hover:text-foreground'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}

// Sub-components
function OverviewTab() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-muted-foreground mb-2">System Status</h3>
                    <p className="text-2xl font-bold text-green-500">Online</p>
                </div>
            </div>
            <p className="text-muted-foreground">Select a module from the sidebar to manage content.</p>
        </div>
    )
}

// --- Interfaces ---
interface Message { _id: string; name: string; email: string; subject: string; message: string; createdAt: string; isRead: boolean; }
interface Project { _id: string; title: string; techStack: string[]; description: string; githubLink?: string; liveLink?: string; }
interface Skill { _id: string; skillName: string; proficiencyLevel: string; category: string; }
interface Experience { _id: string; role: string; companyName: string; duration: string; description: string[]; }
interface Certificate { _id: string; title: string; issuer: string; date: string; credentialUrl: string; }

// --- Managers ---

function MessagesManager() {
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchMessages = async () => {
        const res = await fetch("/api/admin/messages");
        if (res.ok) setMessages(await res.json());
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete message?")) return;
        await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
        fetchMessages();
    };

    const toggleRead = async (id: string, currentStatus: boolean) => {
        await fetch("/api/admin/messages", {
            method: "PATCH",
            body: JSON.stringify({ id, isRead: !currentStatus })
        });
        fetchMessages();
    }

    return (
        <div className="space-y-4">
            {messages.map((msg) => (
                <div key={msg._id} className={`p-4 border rounded-xl flex justify-between items-start gap-4 transition-colors ${msg.isRead ? 'bg-card border-border opacity-75' : 'bg-secondary/5 border-primary/20'}`}>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-foreground">{msg.name}</h4>
                            <span className="text-xs text-muted-foreground">({msg.email})</span>
                            {!msg.isRead && <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">NEW</span>}
                        </div>
                        <p className="text-sm font-medium text-foreground/80 mb-2">{msg.subject}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-4">{new Date(msg.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => toggleRead(msg._id, msg.isRead)} className="p-2 hover:bg-secondary/10 rounded text-primary" title={msg.isRead ? "Mark Unread" : "Mark Read"}>
                            {msg.isRead ? <CheckCircle size={18} /> : <MessageSquare size={18} />}
                        </button>
                        <button onClick={() => handleDelete(msg._id)} className="p-2 hover:bg-destructive/10 rounded text-destructive" title="Delete">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
            {messages.length === 0 && <div className="text-center p-8 text-muted-foreground">No messages found.</div>}
        </div>
    )
}

function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const fetchData = async () => { const res = await fetch("/api/admin/projects"); if (res.ok) setProjects(await res.json()); };
    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" }); fetchData(); } };
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/admin/projects", { method: "POST", body: JSON.stringify({ ...newItem, techStack: newItem.techStack?.split(",") || [] }) });
        setShowForm(false); fetchData(); setNewItem({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Projects</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex gap-2 text-sm py-2 px-4 items-center"><Plus size={16} /> Add New</button>
            </div>
            {showForm && (
                <form onSubmit={handleSave} className="space-y-4 bg-card p-6 rounded-xl border border-border">
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Title" onChange={e => setNewItem({ ...newItem, title: e.target.value })} required />
                    <textarea className="input-field w-full p-2 bg-background border rounded" placeholder="Description" onChange={e => setNewItem({ ...newItem, description: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Tech Stack (comma separated)" onChange={e => setNewItem({ ...newItem, techStack: e.target.value })} />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="GitHub Link" onChange={e => setNewItem({ ...newItem, githubLink: e.target.value })} />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Live Link" onChange={e => setNewItem({ ...newItem, liveLink: e.target.value })} />
                    <button className="btn-primary w-full py-2">Save</button>
                </form>
            )}
            <div className="grid gap-4">
                {projects.map(p => (
                    <div key={p._id} className="p-4 bg-card border border-border rounded flex justify-between">
                        <div><h4 className="font-bold">{p.title}</h4><p className="text-sm text-muted-foreground">{p.description}</p></div>
                        <button onClick={() => handleDelete(p._id)} className="text-destructive"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const fetchData = async () => { const res = await fetch("/api/admin/skills"); if (res.ok) setSkills(await res.json()); };
    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" }); fetchData(); } };
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/admin/skills", { method: "POST", body: JSON.stringify(newItem) });
        setShowForm(false); fetchData(); setNewItem({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Skills</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex gap-2 text-sm py-2 px-4 items-center"><Plus size={16} /> Add New</button>
            </div>
            {showForm && (
                <form onSubmit={handleSave} className="space-y-4 bg-card p-6 rounded-xl border border-border">
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Skill Name" onChange={e => setNewItem({ ...newItem, skillName: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Category" onChange={e => setNewItem({ ...newItem, category: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Proficiency (e.g. Advanced)" onChange={e => setNewItem({ ...newItem, proficiencyLevel: e.target.value })} />
                    <button className="btn-primary w-full py-2">Save</button>
                </form>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map(s => (
                    <div key={s._id} className="p-4 bg-card border border-border rounded flex justify-between items-center">
                        <div><h4 className="font-bold">{s.skillName}</h4><p className="text-xs text-muted-foreground">{s.category} • {s.proficiencyLevel}</p></div>
                        <button onClick={() => handleDelete(s._id)} className="text-destructive"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CertificatesManager() {
    const [certs, setCerts] = useState<Certificate[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const fetchData = async () => { const res = await fetch("/api/admin/certificates"); if (res.ok) setCerts(await res.json()); };
    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/admin/certificates?id=${id}`, { method: "DELETE" }); fetchData(); } };
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/admin/certificates", { method: "POST", body: JSON.stringify(newItem) });
        setShowForm(false); fetchData(); setNewItem({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Certificates</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex gap-2 text-sm py-2 px-4 items-center"><Plus size={16} /> Add New</button>
            </div>
            {showForm && (
                <form onSubmit={handleSave} className="space-y-4 bg-card p-6 rounded-xl border border-border">
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Title" onChange={e => setNewItem({ ...newItem, title: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Issuer" onChange={e => setNewItem({ ...newItem, issuer: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Date/Year" onChange={e => setNewItem({ ...newItem, date: e.target.value })} required />
                    <button className="btn-primary w-full py-2">Save</button>
                </form>
            )}
            <div className="grid gap-4">
                {certs.map(c => (
                    <div key={c._id} className="p-4 bg-card border border-border rounded flex justify-between items-center">
                        <div><h4 className="font-bold">{c.title}</h4><p className="text-xs text-muted-foreground">{c.issuer} • {c.date}</p></div>
                        <button onClick={() => handleDelete(c._id)} className="text-destructive"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ExperienceManager() {
    const [exp, setExp] = useState<Experience[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const fetchData = async () => { const res = await fetch("/api/admin/experience"); if (res.ok) setExp(await res.json()); };
    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" }); fetchData(); } };
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/admin/experience", { method: "POST", body: JSON.stringify({ ...newItem, description: [newItem.description] }) });
        setShowForm(false); fetchData(); setNewItem({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Experience</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex gap-2 text-sm py-2 px-4 items-center"><Plus size={16} /> Add New</button>
            </div>
            {showForm && (
                <form onSubmit={handleSave} className="space-y-4 bg-card p-6 rounded-xl border border-border">
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Company" onChange={e => setNewItem({ ...newItem, companyName: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Role" onChange={e => setNewItem({ ...newItem, role: e.target.value })} required />
                    <input className="input-field w-full p-2 bg-background border rounded" placeholder="Duration" onChange={e => setNewItem({ ...newItem, duration: e.target.value })} required />
                    <textarea className="input-field w-full p-2 bg-background border rounded" placeholder="Description" onChange={e => setNewItem({ ...newItem, description: e.target.value })} required />
                    <button className="btn-primary w-full py-2">Save</button>
                </form>
            )}
            <div className="grid gap-4">
                {exp.map(x => (
                    <div key={x._id} className="p-4 bg-card border border-border rounded flex justify-between items-start">
                        <div><h4 className="font-bold">{x.role}</h4><p className="text-sm text-primary">{x.companyName}</p><p className="text-xs text-muted-foreground">{x.duration}</p></div>
                        <button onClick={() => handleDelete(x._id)} className="text-destructive"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}
