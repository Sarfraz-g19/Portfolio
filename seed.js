require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const Project = require('./backend/models/Project');
const Skill = require('./backend/models/Skill');
const Experience = require('./backend/models/Experience');
const Certification = require('./backend/models/Certification');
const Profile = require('./backend/models/Profile');

const profile = {
    name: "Mohammad Sarfraj Shah",
    title: "Full Stack Developer & Cyber Security Aspirant",
    subtitle: "Entry-level professional passionate about building secure web applications and defensive security.",
    bio: "I am a dedicated Full Stack Developer and Cybersecurity enthusiast who recently completed an intensive internship at ANSH InfoTech. I specialize in the MERN stack and have a strong foundation in network security and penetration testing. Currently looking for entry-level opportunities where I can apply my skills in securing the digital landscape while building high-performance web solutions.",
    avatar: "https://github.com/Sarfraz-g19.png",
    availableForHire: true,
    socialLinks: {
        github: "https://github.com/Sarfraz-g19",
        linkedin: "https://linkedin.com/in/sarfraj-shah",
        email: "mohammadsarfraj2001@gmail.com"
    }
};

const projects = [
    {
        title: "Anand Engineers",
        description: "A professional corporate website designed for an engineering firm. Built to showcase services, client portfolios, and company achievements with a focus on fast load times and SEO optimization.",
        techStack: ["WordPress", "PHP", "SEO", "Responsive Design"],
        liveLink: "https://anandengineers.in/",
        githubLink: "https://github.com/Sarfraz-g19",
        projectImage: "https://images.unsplash.com/photo-1581094794329-cd48ef4215f9?w=800&q=80"
    },
    {
        title: "GGSPS School Website",
        description: "A comprehensive educational platform for GGSPS, featuring student information systems, event galleries, and academic resources. Optimized for accessibility and user engagement.",
        techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        liveLink: "https://ggsps.co.in/",
        githubLink: "https://github.com/Sarfraz-g19",
        projectImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
    },
    {
        title: "Jack's Pizza Cafe",
        description: "A vibrant and appetizing website for a local cafe. Includes an interactive menu, online ordering capabilities, and location services to drive customer footfall.",
        techStack: ["Next.js", "Framer Motion", "UI/UX", "Frontend"],
        liveLink: "https://jackspizzacafe.in/",
        githubLink: "https://github.com/Sarfraz-g19",
        projectImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
    },
    {
        title: "Network Vulnerability Scanner",
        description: "Developed a comprehensive network vulnerability scanner that automates the process of identifying open ports and potential security flaws using Python and Nmap libraries.",
        techStack: ["Python", "Nmap", "Network Security", "Multithreading"],
        liveLink: "https://github.com/Sarfraz-g19",
        githubLink: "https://github.com/Sarfraz-g19",
        projectImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
    }
];

const skills = [
    { skillName: "Penetration Testing", category: "others", proficiencyLevel: "Advanced", order: 1 },
    { skillName: "Network Security", category: "others", proficiencyLevel: "Advanced", order: 2 },
    { skillName: "SOC Operations", category: "others", proficiencyLevel: "Intermediate", order: 3 },
    { skillName: "OWASP Top 10", category: "others", proficiencyLevel: "Advanced", order: 4 },
    { skillName: "React", category: "frontend", proficiencyLevel: "Advanced", order: 5 },
    { skillName: "Next.js", category: "frontend", proficiencyLevel: "Advanced", order: 6 },
    { skillName: "Tailwind CSS", category: "frontend", proficiencyLevel: "Advanced", order: 7 },
    { skillName: "Node.js", category: "backend", proficiencyLevel: "Intermediate", order: 8 },
    { skillName: "MongoDB", category: "backend", proficiencyLevel: "Intermediate", order: 9 },
    { skillName: "Python", category: "others", proficiencyLevel: "Advanced", order: 10 },
    { skillName: "Linux", category: "tools", proficiencyLevel: "Expert", order: 11 },
    { skillName: "Nmap", category: "tools", proficiencyLevel: "Advanced", order: 12 },
    { skillName: "Wireshark", category: "tools", proficiencyLevel: "Intermediate", order: 13 },
    { skillName: "Burp Suite", category: "tools", proficiencyLevel: "Intermediate", order: 14 }
];

const experiences = [
    {
        companyName: "ANSH InfoTech",
        role: "Cyber Security Intern",
        duration: "Jan 2025 - Present",
        description: [
            "Conducting vulnerability assessments and security audits for web applications.",
            "Implementing network defense mechanisms and performing packet analysis using Wireshark.",
            "Collaborating on technical documentation for security protocols and incident response."
        ],
        technologiesUsed: ["Cybersecurity", "Networking", "Linux", "Wireshark"]
    },
    {
        companyName: "Freelance",
        role: "Web Developer",
        duration: "Aug 2024 - Feb 2025",
        description: [
            "Developing custom web solutions for diverse clients using modern frameworks.",
            "Utilizing Next.js, React, and Tailwind CSS to deliver high-performance websites.",
            "Ensuring SEO optimization and responsive design across all projects."
        ],
        technologiesUsed: ["Next.js", "React", "Tailwind CSS", "SEO"]
    },
    {
        companyName: "Braintrain Info Solutions",
        role: "Full Stack Developer Trainee",
        duration: "June 2024 - Dec 2024",
        description: [
            "Completed intensive full-stack development training with a focus on MERN stack.",
            "Implemented secure coding practices and integrated RESTful APIs.",
            "Built responsive user interfaces and managed database schemas."
        ],
        technologiesUsed: ["React", "Node.js", "Express", "MongoDB"]
    }
];

const certifications = [
    {
        title: "AWS Cloud Practitioner Essentials",
        issuer: "Amazon Web Services (AWS)",
        date: "2024",
        verified: true,
        credentialUrl: ""
    },
    {
        title: "AWS Technical Essentials",
        issuer: "Amazon Web Services (AWS)",
        date: "2024",
        verified: true,
        credentialUrl: ""
    },
    {
        title: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2025",
        verified: true,
        credentialUrl: ""
    },
    {
        title: "Web Developer Certification",
        issuer: "Braintrain Info Solutions",
        date: "2024",
        verified: true,
        credentialUrl: ""
    },
    {
        title: "Internship Certificate",
        issuer: "ANSH InfoTech",
        date: "2025",
        verified: true,
        credentialUrl: ""
    }
];

const seedDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected Successfully.");

        // Clear existing data
        console.log("Clearing existing data...");
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Certification.deleteMany({});
        await Profile.deleteMany({});

        // Insert new data
        console.log("Inserting resume data...");
        await Profile.create(profile);
        await Project.insertMany(projects);
        await Skill.insertMany(skills);
        await Experience.insertMany(experiences);
        await Certification.insertMany(certifications);

        console.log("Database Seeded Successfully with Resume Data!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
