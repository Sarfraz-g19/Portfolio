const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function tryConnection(name, uri) {
    console.log(`\n--- Testing ${name} ---`);
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ SUCCESS: ${name} connected!`);
        return true;
    } catch (err) {
        console.log(`❌ FAILED: ${name}`);
        console.log(`   Error: ${err.message}`);
        return false;
    } finally {
        await mongoose.disconnect();
    }
}

async function start() {
    const user = "zaynnsaifi2001_db_user";
    const pass = "Sarfraj%40123";
    const db = "portfolioDB";

    // Variation 1: SRV
    const srv = `mongodb+srv://${user}:${pass}@portfolio0.dhh0bpd.mongodb.net/${db}?retryWrites=true&w=majority`;

    // Variation 2: Long Form (Full Cluster)
    const long = `mongodb://${user}:${pass}@ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017,ac-8y2qhix-shard-00-01.dhh0bpd.mongodb.net:27017,ac-8y2qhix-shard-00-02.dhh0bpd.mongodb.net:27017/${db}?ssl=true&replicaSet=atlas-4idr8n-shard-0&authSource=admin&retryWrites=true&w=majority`;

    // Variation 3: Direct Node (Single)
    const direct = `mongodb://${user}:${pass}@ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017/${db}?ssl=true&authSource=admin&directConnection=true`;

    if (await tryConnection("SRV URL", srv)) return;
    if (await tryConnection("Long Form URL", long)) return;
    if (await tryConnection("Direct Node URL", direct)) return;

    console.log("\nAll attempts failed. This confirms that while the servers are 'reachable', the cluster is rejecting the connection handshake.");
    console.log("Common reasons:");
    console.log("1. Your IP is NOT whitelisted in 'Network Access'.");
    console.log("2. Your database user password or username is incorrect.");
}

start();
