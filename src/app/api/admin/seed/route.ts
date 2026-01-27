import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Certification from "@/models/Certification";
import Experience from "@/models/Experience";
// import Service from "@/models/Service";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        // Clear existing data to ensure a clean slate
        await Skill.deleteMany({});
        await Project.deleteMany({});
        await Certification.deleteMany({});
        await Experience.deleteMany({});
        // await Service.deleteMany({});

        // Data
        const skills = [
            { name: "Python", level: 90, category: "Languages" },
            { name: "JavaScript/TypeScript", level: 85, category: "Languages" },
            { name: "C/C++", level: 75, category: "Languages" },
            { name: "Bash Scripting", level: 80, category: "Languages" },
            { name: "Network Security", level: 95, category: "Security" },
            { name: "Penetration Testing", level: 90, category: "Security" },
            { name: "Web App Security", level: 85, category: "Security" },
            { name: "Metasploit", level: 85, category: "Tools" },
            { name: "Wireshark", level: 90, category: "Tools" },
            { name: "Burp Suite", level: 85, category: "Tools" },
            { name: "Nmap", level: 95, category: "Tools" },
            { name: "Linux Administration", level: 85, category: "Infrastructure" },
            { name: "Docker", level: 75, category: "Infrastructure" },
            { name: "SIEM (Splunk)", level: 80, category: "Tools" },
        ];

        const projects = [
            {
                title: "Network Traffic Anomaly Detector",
                description: "A Python-based tool leveraging Scapy and Machine Learning (Isolation Forest) to detect anomalous traffic patterns and potential intrusions in real-time.",
                techStack: ["Python", "Scapy", "Sklearn", "Pandas"],
                githubUrl: "https://github.com/Sarfraz-g19",
                liveUrl: "",
                image: ""
            },
            {
                title: "Automated Vulnerability Scanner",
                description: "Custom vulnerability scanner aggregating Nmap and Nikto results, automating report generation for web application security assessments.",
                techStack: ["Bash", "Python", "Nmap", "Nikto"],
                githubUrl: "https://github.com/Sarfraz-g19",
                liveUrl: "",
                image: ""
            },
            {
                title: "Secure Encrypted Chat",
                description: "End-to-End encrypted chat application using AES-256 encryption and RSA key exchange, ensuring private communication.",
                techStack: ["Node.js", "Socket.io", "Cryptography", "React"],
                githubUrl: "https://github.com/Sarfraz-g19",
                liveUrl: "https://secure-chat-demo.vercel.app",
                image: ""
            }
        ];

        const experience = [
            {
                role: "Cyber Security Analyst Intern",
                company: "TechDefenders Solutions",
                period: "2024 - Present",
                description: "Monitoring network traffic for suspicious activity using SIEM tools. Assisting in vulnerability assessments and patch management."
            },
            {
                role: "Freelance Penetration Tester",
                company: "Self-Employed",
                period: "2023 - 2024",
                description: "Conducted black-box penetration testing for small businesses. Identified critical SQL injection and XSS vulnerabilities."
            }
        ];

        const certificates = [
            {
                title: "CompTIA Security+",
                organization: "CompTIA",
                year: 2024,
                certificateUrl: "#"
            },
            {
                title: "Google Cybersecurity Professional",
                organization: "Google",
                year: 2023,
                certificateUrl: "#"
            },
            {
                title: "Certified Ethical Hacker (Practical)",
                organization: "EC-Council",
                year: 2025,
                certificateUrl: "#"
            }
        ];

        const services = [
            {
                title: "Penetration Testing",
                description: "Simulated cyberattacks against your computer system to check for exploitable vulnerabilities.",
                icon: "Shield",
                status: true
            },
            {
                title: "Vulnerability Assessment",
                description: "Systematic review of security weaknesses in an information system.",
                icon: "Search",
                status: true
            },
            {
                title: "Security Auditing",
                description: "Comprehensive analysis of an organization's security posture and compliance.",
                icon: "FileCheck",
                status: true
            }
        ];

        await Skill.insertMany(skills);
        await Project.insertMany(projects);
        await Experience.insertMany(experience);
        await Certification.insertMany(certificates);
        // await Service.insertMany(services);

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully",
            counts: {
                skills: skills.length,
                projects: projects.length,
                experience: experience.length,
                certificates: certificates.length,
                services: services.length
            }
        });

    } catch (error) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
