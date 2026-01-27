"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { BarChart3, Box, FileText, LayoutDashboard, Settings, Shield, Users, Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState({ projects: 0, skills: 0, certs: 0 });

    // Verify Admin Email Clientside (Backend does the real check)
    // Using a more robust check that handles potential case differences
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
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg tracking-wider">SECURE <span className="text-primary">ADMIN</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
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
            <main className="flex-1 p-8 overflow-y-auto">
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

// Sub-components for Tabs
function OverviewTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-muted-foreground mb-2">Total Statistics</h3>
                <p className="text-sm text-muted-foreground">Stats will populate live from DB.</p>
            </div>
        </div>
    )
}

interface Project { _id: string; title: string; techStack: string[]; description: string; }
interface Skill { _id: string; name: string; level: number; category: string; }
interface Experience { _id: string; role: string; company: string; period: string; description: string; }
interface Certificate { _id: string; title: string; organization: string; year: number; certificateUrl: string; }

function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "" });

    const fetchProjects = async () => {
        const res = await fetch("/api/admin/projects");
        if (res.ok) setProjects(await res.json());
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        setLoading(true);
        await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
        await fetchProjects();
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/admin/projects", {
            method: "POST",
            body: JSON.stringify({ ...newProject, techStack: newProject.techStack.split(",").map(t => t.trim()) })
        });
        await fetchProjects();
        setShowForm(false);
        setNewProject({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "" });
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Manage Projects</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={16} /> Add Project</button>
            </div>

            {showForm && (
                <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                    <textarea className="w-full p-2 bg-background border border-border rounded" placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Tech Stack (comma separated)" value={newProject.techStack} onChange={e => setNewProject({ ...newProject, techStack: e.target.value })} required />
                    <div className="flex gap-2">
                        <input className="w-1/2 p-2 bg-background border border-border rounded" placeholder="GitHub URL" value={newProject.githubUrl} onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })} />
                        <input className="w-1/2 p-2 bg-background border border-border rounded" placeholder="Live URL" value={newProject.liveUrl} onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })} />
                    </div>
                    <button disabled={loading} className="btn-primary w-full">{loading ? "Saving..." : "Save Project"}</button>
                </form>
            )}

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-secondary/20 text-left">
                        <tr>
                            <th className="p-4 font-medium text-muted-foreground">Name</th>
                            <th className="p-4 font-medium text-muted-foreground">Tech Stack</th>
                            <th className="p-4 font-medium text-muted-foreground right-0 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {projects.map((p) => (
                            <tr key={p._id}>
                                <td className="p-4 text-foreground font-medium">{p.title}</td>
                                <td className="p-4 text-muted-foreground">{p.techStack?.join(", ")}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(p._id)} className="text-destructive hover:bg-destructive/10 p-2 rounded"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No projects found in database.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: "", level: 50, category: "Cyber Security Tools" });

    const fetchSkills = async () => {
        const res = await fetch("/api/admin/skills");
        if (res.ok) setSkills(await res.json());
    };

    useEffect(() => { fetchSkills(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete skill?")) return;
        await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
        fetchSkills();
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/admin/skills", { method: "POST", body: JSON.stringify(newSkill) });
        await fetchSkills();
        setShowForm(false);
        setNewSkill({ name: "", level: 50, category: "Cyber Security Tools" });
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Manage Skills</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={16} /> Add Skill</button>
            </div>

            {showForm && (
                <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} required />
                    <div className="flex gap-4 items-center">
                        <label className="text-sm text-muted-foreground">Level (%):</label>
                        <input type="number" min="0" max="100" className="p-2 bg-background border border-border rounded w-20" value={newSkill.level} onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })} required />
                        <select className="p-2 bg-background border border-border rounded flex-grow" value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}>
                            <option>Cyber Security Tools</option>
                            <option>Programming & Scripting</option>
                            <option>Cloud & DevOps</option>
                        </select>
                    </div>
                    <button disabled={loading} className="btn-primary w-full">{loading ? "Saving..." : "Save Skill"}</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((s) => (
                    <div key={s._id} className="p-4 bg-card border border-border rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold text-foreground">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.category} • {s.level}%</p>
                        </div>
                        <button onClick={() => handleDelete(s._id)} className="text-destructive hover:bg-destructive/10 p-2 rounded"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>
            {skills.length === 0 && <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">No skills found.</div>}
        </div>
    )
}

function ExperienceManager() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newExp, setNewExp] = useState({ role: "", company: "", period: "", description: "" });

    const fetchExp = async () => {
        const res = await fetch("/api/admin/experience");
        if (res.ok) setExperiences(await res.json());
    };

    useEffect(() => { fetchExp(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete experience?")) return;
        await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
        fetchExp();
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/admin/experience", { method: "POST", body: JSON.stringify(newExp) });
        await fetchExp();
        setShowForm(false);
        setNewExp({ role: "", company: "", period: "", description: "" });
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Experience</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={16} /> Add Experience</button>
            </div>

            {showForm && (
                <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Role / Job Title" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} required />
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} required />
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Period (e.g. 2024 - Present)" value={newExp.period} onChange={e => setNewExp({ ...newExp, period: e.target.value })} required />
                    <textarea className="w-full p-2 bg-background border border-border rounded h-32" placeholder="Description of responsibilities..." value={newExp.description} onChange={e => setNewExp({ ...newExp, description: e.target.value })} required />
                    <button disabled={loading} className="btn-primary w-full">{loading ? "Saving..." : "Save Experience"}</button>
                </form>
            )}

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp._id} className="p-4 bg-card border border-border rounded flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lg text-foreground">{exp.role}</p>
                            <p className="text-primary">{exp.company}</p>
                            <p className="text-xs text-muted-foreground my-1">{exp.period}</p>
                            <p className="text-sm text-foreground/80 line-clamp-2">{exp.description}</p>
                        </div>
                        <button onClick={() => handleDelete(exp._id)} className="text-destructive hover:bg-destructive/10 p-2 rounded"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>
            {experiences.length === 0 && <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">No experience entries found.</div>}
        </div>
    )
}

function CertificatesManager() {
    const [certs, setCerts] = useState<Certificate[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newCert, setNewCert] = useState({ title: "", organization: "", year: new Date().getFullYear(), certificateUrl: "" });

    const fetchCerts = async () => {
        const res = await fetch("/api/admin/certificates");
        if (res.ok) setCerts(await res.json());
    };

    useEffect(() => { fetchCerts(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete certificate?")) return;
        await fetch(`/api/admin/certificates?id=${id}`, { method: "DELETE" });
        fetchCerts();
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/admin/certificates", { method: "POST", body: JSON.stringify(newCert) });
        await fetchCerts();
        setShowForm(false);
        setNewCert({ title: "", organization: "", year: new Date().getFullYear(), certificateUrl: "" });
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Certificates</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={16} /> Add Certificate</button>
            </div>

            {showForm && (
                <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Certificate Title" value={newCert.title} onChange={e => setNewCert({ ...newCert, title: e.target.value })} required />
                    <input className="w-full p-2 bg-background border border-border rounded" placeholder="Issuing Organization" value={newCert.organization} onChange={e => setNewCert({ ...newCert, organization: e.target.value })} required />
                    <div className="flex gap-4">
                        <input type="number" className="w-32 p-2 bg-background border border-border rounded" placeholder="Year" value={newCert.year} onChange={e => setNewCert({ ...newCert, year: parseInt(e.target.value) })} required />
                        <input className="flex-grow p-2 bg-background border border-border rounded" placeholder="Certificate URL (Optional)" value={newCert.certificateUrl} onChange={e => setNewCert({ ...newCert, certificateUrl: e.target.value })} />
                    </div>
                    <button disabled={loading} className="btn-primary w-full">{loading ? "Saving..." : "Save Certificate"}</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs.map((c) => (
                    <div key={c._id} className="p-4 bg-card border border-border rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold text-foreground">{c.title}</p>
                            <p className="text-xs text-muted-foreground">{c.organization} • {c.year}</p>
                        </div>
                        <button onClick={() => handleDelete(c._id)} className="text-destructive hover:bg-destructive/10 p-2 rounded"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>
            {certs.length === 0 && <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">No certificates found.</div>}
        </div>
    )
}
