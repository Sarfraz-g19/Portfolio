const net = require('net');

const nodes = [
    'ac-8y2qhix-shard-00-00.dhh0bpd.mongodb.net',
    'ac-8y2qhix-shard-00-01.dhh0bpd.mongodb.net',
    'ac-8y2qhix-shard-00-02.dhh0bpd.mongodb.net'
];

async function checkNodes() {
    console.log("Checking if your computer can reach MongoDB Atlas servers...");

    for (const node of nodes) {
        const promise = new Promise((resolve) => {
            const socket = new net.Socket();
            const timeout = 5000;

            socket.setTimeout(timeout);

            socket.on('connect', () => {
                console.log(`✅ REACHABLE: ${node}`);
                socket.destroy();
                resolve(true);
            });

            socket.on('timeout', () => {
                console.log(`❌ TIMEOUT: ${node} (Blocked by Firewall/IP Whitelist)`);
                socket.destroy();
                resolve(false);
            });

            socket.on('error', (err) => {
                console.log(`❌ ERROR: ${node} (${err.message})`);
                resolve(false);
            });

            socket.connect(27017, node);
        });
        await promise;
    }

    console.log("\n--- RESULT ---");
    console.log("If you see 'TIMEOUT', it means you MUST add your IP to MongoDB Atlas Network Access.");
}

checkNodes();
