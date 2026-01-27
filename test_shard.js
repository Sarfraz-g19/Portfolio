const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Using the sharded hostnames decoded from nslookup
const shardUri = "mongodb://zaynnsaifi2001_db_user:Sarfraj%40123@ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017,ac-8y2qhix-shard-00-01.dhh0bpd.mongodb.net:27017,ac-8y2qhix-shard-00-02.dhh0bpd.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-4idr8n-shard-0&authSource=admin&retryWrites=true&w=majority";

const testShardedConnection = async () => {
    try {
        console.log("Testing sharded connection...");
        await mongoose.connect(shardUri, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected via sharded URI");
        await mongoose.disconnect();
    } catch (err) {
        console.error("FAILURE: Sharded connection failed");
        console.error(err.message);
    }
};

testShardedConnection();
