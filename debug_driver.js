const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function debugConnect() {
    const uri = process.env.MONGODB_URI;
    console.log("Testing with Drive directly...");
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Native Driver Connected!");
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases available:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        await client.close();
    } catch (err) {
        console.error("❌ Driver connection failed:");
        console.error(err);
    }
}

debugConnect();
