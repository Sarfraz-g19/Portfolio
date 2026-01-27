const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function findReplicaSetName() {
    const nodes = [
        'ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net:27017',
        'ac-8y2qhix-shard-00-01.dhh0bpd.mongodb.net:27017',
        'ac-8y2qhix-shard-00-02.dhh0bpd.mongodb.net:27017'
    ];

    for (const node of nodes) {
        const uri = `mongodb://zaynnsaifi2001_db_user:Sarfraj%40123@${node}/?authSource=admin&ssl=true`;
        const client = new MongoClient(uri);
        try {
            console.log(`Trying ${node}...`);
            await client.connect();
            const admin = client.db('admin');
            const status = await admin.command({ isMaster: 1 });
            console.log(`Found ReplicaSet Name: ${status.setName}`);
            process.exit(0);
        } catch (err) {
            console.error(`Failed on ${node}: ${err.message}`);
        } finally {
            await client.close();
        }
    }
}

findReplicaSetName();
