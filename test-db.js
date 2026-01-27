const mongoose = require('mongoose');
const uri = "mongodb+srv://zaynnsaifi2001_db_user:5sUoi54P46mm5vek@portfolio0.dhh0bpd.mongodb.net/antigravity_portfolio?retryWrites=true&w=majority";

console.log("Connecting to:", uri.replace(/:[^:]*@/, ':****@')); // Hide password in logs

mongoose.connect(uri)
    .then(() => {
        console.log("Connected successfully!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection failed:", err);
        process.exit(1);
    });
