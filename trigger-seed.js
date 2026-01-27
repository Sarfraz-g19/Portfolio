const fetch = require('node-fetch');

async function seed() {
    try {
        console.log("Seeding database...");
        const res = await fetch('http://localhost:3000/api/seed');
        const data = await res.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Error seeding:", e.message);
    }
}

seed();
