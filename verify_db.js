const mongoose = require('mongoose');
require('dotenv').config();

// URI from .env
const uriScic = process.env.MONGODB_URI;

const checkScic = async () => {
    try {
        console.log("Connecting to scic-app...");
        const conn = await mongoose.createConnection(uriScic).asPromise();
        console.log("Connected.");
        const count = await conn.collection('items').countDocuments();
        console.log(`COUNT: ${count}`);
        await conn.close();
    } catch (err) {
        console.error('Error:', err);
    }
};

checkScic();
