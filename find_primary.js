const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkNodesManual() {
    const nodes = [
        'ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017',
        'ac-8y2qhix-shard-00-01.dhh0bpd.mongodb.net:27017',
        'ac-8y2qhix-shard-00-02.dhh0bpd.mongodb.net:27017'
    ];

    for (const node of nodes) {
        console.log(`\nTesting Node: ${node}`);
        const uri = `mongodb://zaynnsaifi2001_db_user:Sarfraj%40123@${node}/portfolioDB?ssl=true&authSource=admin&directConnection=true`;
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log(`✅ Connected to ${node}`);
            const isMaster = await mongoose.connection.db.admin().command({ isMaster: 1 });
            if (isMaster.ismaster) {
                console.log(`🌟 THIS IS THE PRIMARY NODE!`);
                console.log(`Use this URI: ${uri}`);
            } else {
                console.log(`ℹ️ This is a secondary node.`);
            }
            await mongoose.disconnect();
        } catch (err) {
            console.log(`❌ Failed: ${err.message}`);
        }
    }
}

checkNodesManual();
