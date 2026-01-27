export default function AboutPage() {
    return (
        <div className="py-10 space-y-12">
            <section>
                <h1 className="text-4xl font-bold mb-6">About Me</h1>
                <div className="glass p-8 rounded-xl">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Cybersecurity professional with hands-on experience in Web Application Penetration Testing, SOC operations, and security tool development. Proven track record in identifying critical vulnerabilities including SQL Injection, XSS, and IDOR, while developing Python-based security automation tools. Skilled in threat detection, incident response, and IDS/IPS systems with a strong foundation in both offensive and defensive security practices.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
                <div className="glass p-8 rounded-xl space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-primary">Cybersecurity Intern</h3>
                                <p className="text-lg font-semibold">ANSH InfoTech</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">July 2025 – December 2025</p>
                                <p className="text-sm text-muted-foreground">Ludhiana, Punjab, India</p>
                            </div>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                            <li>Conducted comprehensive Web Application Penetration Testing on 15+ applications, identifying and documenting 40+ critical vulnerabilities including SQL Injection, XSS, and IDOR.</li>
                            <li>Developed 5+ custom Python-based security tools for automated vulnerability scanning, log analysis, and threat detection, reducing manual assessment time by 60%.</li>
                            <li>Operated in SOC environment monitoring network traffic and analyzing 500+ daily security events.</li>
                            <li>Configured and managed IDS/IPS systems (Snort/Suricata) to detect and respond to intrusion attempts.</li>
                            <li>Collaborated with cross-functional teams to implement security fixes, reducing critical vulnerabilities by 85%.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">Education</h2>
                <div className="glass p-8 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-primary">Bachelor of Computer Applications (BCA)</h3>
                            <p className="text-lg">Guru Nanak Dev University (GNDU)</p>
                            <p className="text-sm text-muted-foreground mt-1">Python Specialization</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">2021 – 2024</p>
                            <p className="text-sm text-muted-foreground">Amritsar, Punjab, India</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">Certifications</h2>
                <div className="glass p-8 rounded-xl">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>AWS Technical Essentials – Amazon Web Services</li>
                        <li>Getting Started with DevOps on AWS – Amazon Web Services</li>
                        <li>Build a Career in DevOps, Cloud Computing & Cyber Security – Professional Certificate</li>
                        <li>Job Roles in the Cloud – Cloud Career Training</li>
                        <li>Vulnerability Management – Security Operations Training</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
