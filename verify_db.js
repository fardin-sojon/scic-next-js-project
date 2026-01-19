const mongoose = require('mongoose');

// URI from .env
const uriScic = "mongodb+srv://scic_nextJS_db:ppOrHAhrumItcDy9@simple-crud-mongodb-pra.v6jm7nb.mongodb.net/scic-app?appName=simple-crud-mongodb-practice";

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
