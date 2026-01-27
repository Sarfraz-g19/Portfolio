const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const testConnection = async () => {
    try {
        // Trying one specific node directly
        const uri = "mongodb://zaynnsaifi2001_db_user:Sarfraj%40123@ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017/portfolioDB?ssl=true&authSource=admin&directConnection=true";
        console.log("Testing direct connection to first node...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected to MongoDB node directly");
        await mongoose.disconnect();
    } catch (err) {
        console.error("FAILURE: Could not connect");
        console.error(err.message);
    }
};

testConnection();
