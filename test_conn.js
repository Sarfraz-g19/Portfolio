const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const testConnection = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        console.log("Testing connection to:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected to MongoDB");
        await mongoose.disconnect();
    } catch (err) {
        console.error("FAILURE: Could not connect to MongoDB");
        console.error(err);
    }
};

testConnection();
