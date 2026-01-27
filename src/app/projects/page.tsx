export default function ProjectsPage() {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-bold mb-6">Projects</h1>
            <p className="text-muted-foreground mb-8">Showcase of security and development projects.</p>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="glass p-6 rounded-xl hover:bg-primary/5 transition-colors">
                    <h3 className="text-xl font-bold text-primary">Automated Vulnerability Scanner</h3>
                    <p className="text-xs text-muted-foreground mb-2">Python, Requests, BeautifulSoup, Threading</p>
                    <p className="text-sm mt-2 text-muted-foreground">Built Python-based web vulnerability scanner to detect SQL Injection, XSS, and security misconfigurations. Implemented multi-threaded scanning engine processing 100+ requests per minute.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:bg-primary/5 transition-colors">
                    <h3 className="text-xl font-bold text-primary">SOC Log Analysis Dashboard</h3>
                    <p className="text-xs text-muted-foreground mb-2">Python, ELK Stack, Data Visualization</p>
                    <p className="text-sm mt-2 text-muted-foreground">Created automated log aggregation and analysis system for security event monitoring. Developed custom parsers for firewall, IDS, and application logs with real-time alerting.</p>
                </div>
                <div className="glass p-6 rounded-xl hover:bg-primary/5 transition-colors">
                    <h3 className="text-xl font-bold text-primary">Network Traffic Analyzer</h3>
                    <p className="text-xs text-muted-foreground mb-2">Python, Scapy, Packet Analysis</p>
                    <p className="text-sm mt-2 text-muted-foreground">Designed packet capture and analysis tool for identifying malicious network patterns. Implemented detection algorithms for common attack signatures including port scanning and DDoS.</p>
                </div>
            </div>
        </div>
    );
}
