import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Experience from "@/models/Experience";
import Certification from "@/models/Certification";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Project from "@/models/Project";

export async function GET() {
    try {
        await connectToDatabase();

        // 1. CLEAR EXISTING DATA
        await Profile.deleteMany({});
        await Experience.deleteMany({});
        await Certification.deleteMany({});
        await Skill.deleteMany({});
        await Project.deleteMany({});

        // 2. SEED DATA FROM "Mohammad_Sarfraj_Shah_IT_Resume_WITH_LIVE_PROJECTS.pdf"

        // --- Profile ---
        const profileData = {
            name: "Mohammad Sarfraj Shah",
            title: "Web Developer & Cyber Security Engineer",
            subtitle: "Full Stack Developer | Cloud Computing | Security Analyst",
            bio: "Results-driven IT professional with over one year of hands-on experience in Web Development, Cyber Security, and Cloud Computing. Proven ability to build production-level web applications using modern frontend technologies and to work with cloud infrastructure and security fundamentals.",
            avatar: "https://github.com/Sarfraz-g19.png",
            availableForHire: true,
            socialLinks: {
                github: "https://github.com/Sarfraz-g19",
                linkedin: "https://linkedin.com/in/mohammadsarfraj",
                email: "mohammadsarfraj2001@gmail.com"
            }
        };
        await Profile.create(profileData);

        // --- Projects (Live Websites from Resume) ---
        const projects = [
            {
                title: "Anand Engineers",
                description: "Corporate Website. Developed and maintained large-scale live production website with modern UI/UX and performance optimization.",
                techStack: ["WordPress", "SEO", "Responsive Design"],
                liveLink: "https://anandengineers.in/",
                githubLink: "",
                projectImage: "https://images.unsplash.com/photo-1581094794329-cd48ef4215f9?w=800&q=80",
                order: 1
            },
            {
                title: "GGS Public School",
                description: "Educational Website. Comprehensive platform for student information and academic resources.",
                techStack: ["React", "Node.js", "Web Development"],
                liveLink: "https://ggsps.co.in/",
                githubLink: "",
                projectImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                order: 2
            },
            {
                title: "Jack's Pizza Cafe",
                description: "Restaurant Website. Vibrant website featuring interactive menu and online ordering capabilities.",
                techStack: ["Next.js", "React", "Frontend"],
                liveLink: "https://jackspizzacafe.in/",
                githubLink: "",
                projectImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
                order: 3
            }
        ];
        await Project.insertMany(projects);

        // --- Skills (EXACTLY AS PER RESUME) ---
        const skills = [
            // Programming Languages
            { skillName: "C", category: "Programming Languages", proficiencyLevel: "Intermediate", order: 1 },
            { skillName: "C++", category: "Programming Languages", proficiencyLevel: "Intermediate", order: 2 },
            { skillName: "Java", category: "Programming Languages", proficiencyLevel: "Advanced", order: 3 },
            { skillName: "Python", category: "Programming Languages", proficiencyLevel: "Advanced", order: 4 },
            { skillName: "JavaScript", category: "Programming Languages", proficiencyLevel: "Advanced", order: 5 },
            { skillName: "PHP", category: "Programming Languages", proficiencyLevel: "Intermediate", order: 6 },
            { skillName: "Bash", category: "Programming Languages", proficiencyLevel: "Intermediate", order: 7 },
            { skillName: "SQL", category: "Programming Languages", proficiencyLevel: "Intermediate", order: 8 },

            // Frontend
            { skillName: "HTML5", category: "Frontend", proficiencyLevel: "Expert", order: 9 },
            { skillName: "CSS3", category: "Frontend", proficiencyLevel: "Expert", order: 10 },
            { skillName: "Bootstrap", category: "Frontend", proficiencyLevel: "Advanced", order: 11 },
            { skillName: "React.js", category: "Frontend", proficiencyLevel: "Advanced", order: 12 },

            // Cyber Security Tools
            { skillName: "Burp Suite", category: "Cyber Security Tools", proficiencyLevel: "Advanced", order: 13 },
            { skillName: "Nmap", category: "Cyber Security Tools", proficiencyLevel: "Expert", order: 14 },
            { skillName: "Nessus", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 15 },
            { skillName: "Metasploit", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 16 },
            { skillName: "Nikto", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 17 },
            { skillName: "Wireshark", category: "Cyber Security Tools", proficiencyLevel: "Advanced", order: 18 },
            { skillName: "SQLmap", category: "Cyber Security Tools", proficiencyLevel: "Advanced", order: 19 },
            { skillName: "OWASP ZAP", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 20 },
            { skillName: "Hydra", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 21 },
            { skillName: "Netcat", category: "Cyber Security Tools", proficiencyLevel: "Intermediate", order: 22 },

            // Cloud & DevOps
            { skillName: "AWS (EC2)", category: "Cloud & DevOps", proficiencyLevel: "Intermediate", order: 23 },
            { skillName: "Docker", category: "Cloud & DevOps", proficiencyLevel: "Intermediate", order: 24 },
            { skillName: "Jenkins", category: "Cloud & DevOps", proficiencyLevel: "Intermediate", order: 25 },
            { skillName: "Git/GitHub", category: "Cloud & DevOps", proficiencyLevel: "Advanced", order: 26 },
            { skillName: "CI/CD", category: "Cloud & DevOps", proficiencyLevel: "Intermediate", order: 27 },

            // Development Tools
            { skillName: "VS Code", category: "Development Tools", proficiencyLevel: "Advanced", order: 28 },
            { skillName: "IntelliJ", category: "Development Tools", proficiencyLevel: "Advanced", order: 29 },
            { skillName: "PyCharm", category: "Development Tools", proficiencyLevel: "Advanced", order: 30 },
            { skillName: "Android Studio", category: "Development Tools", proficiencyLevel: "Intermediate", order: 31 },
            { skillName: "MySQL", category: "Development Tools", proficiencyLevel: "Intermediate", order: 32 },
            { skillName: "XAMPP", category: "Development Tools", proficiencyLevel: "Intermediate", order: 33 },

            // Operating Systems
            { skillName: "Windows", category: "Operating Systems", proficiencyLevel: "Advanced", order: 34 },
            { skillName: "Linux", category: "Operating Systems", proficiencyLevel: "Expert", order: 35 }
        ];
        await Skill.insertMany(skills);

        // --- Experiences ---
        const experiences = [
            {
                companyName: "Freelance",
                role: "Cyber Security & Cloud Computing Engineer",
                duration: "Jul 2025 – Dec 2025",
                description: [
                    "Worked in Linux and Unix environments executing system administration and security commands.",
                    "Hands-on experience with cyber security fundamentals and vulnerability assessment.",
                    "Deployed and managed AWS EC2 instances.",
                    "Worked with Docker, Jenkins, and CI/CD pipeline fundamentals."
                ],
                technologiesUsed: ["AWS", "Linux", "Docker", "Jenkins"],
                order: 1
            },
            {
                companyName: "Freelance",
                role: "Web Developer",
                duration: "Aug 2024 – Feb 2025",
                description: [
                    "Developed and maintained large-scale live production websites with modern UI/UX.",
                    "Implemented responsive interfaces using HTML5, CSS3, Bootstrap, React.js.",
                    "Worked with Java and Python for application logic and integrations.",
                    "Used Git and GitHub for version control."
                ],
                technologiesUsed: ["React.js", "Bootstrap", "Java", "Python"],
                order: 2
            }
        ];
        await Experience.insertMany(experiences);

        // --- Certificates ---
        const certifications = [
            {
                title: "AWS Cloud Practitioner Essentials",
                issuer: "AWS Free Training Certificate",
                date: "2024",
                verified: true
            },
            {
                title: "AWS Technical Essentials",
                issuer: "AWS Free Certificate",
                date: "2024",
                verified: true
            },
            {
                title: "Web Developer Certification",
                issuer: "Braintrain Info Solutions",
                date: "2024",
                verified: true
            },
            {
                title: "Experience Letter & Internship Certificate",
                issuer: "ANSH InfoTech",
                date: "2024",
                verified: true
            }
        ];
        await Certification.insertMany(certifications);

        return NextResponse.json({ success: true, message: "Resume Data Seeded Successfully!" });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: "Failed to seed database: " + (error as Error).message }, { status: 500 });
    }
}
