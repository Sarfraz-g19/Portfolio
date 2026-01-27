export default function ServicesPage() {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-bold mb-6">Services & Expertise</h1>
            <p className="text-muted-foreground mb-8">Specialized services to secure and optimize your digital infrastructure.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold mb-2">Penetration Testing</h3>
                    <p className="text-sm text-muted-foreground">Web Application Penetration Testing, OWASP Top 10, Vulnerability Assessment, and Security Auditing.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold mb-2">SOC Operations</h3>
                    <p className="text-sm text-muted-foreground">Incident Detection & Response, Threat Analysis, Security Monitoring, and SIEM Log Analysis.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold mb-2">Tool Development</h3>
                    <p className="text-sm text-muted-foreground">Custom Python-based security automation tools, Vulnerability Scanners, and Threat Detection scripts.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
                    <p className="text-sm text-muted-foreground">AWS Security (EC2, S3, IAM), CloudWatch Monitoring, and DevSecOps integration.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold mb-2">Network Defense</h3>
                    <p className="text-sm text-muted-foreground">IDS/IPS Configuration (Snort/Suricata), Firewall Management, and Packet Analysis.</p>
                </div>
            </div>
        </div>
    );
}
