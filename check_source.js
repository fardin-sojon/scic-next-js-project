const mongoose = require('mongoose');

const uriSolo = "mongodb+srv://scic_nextJS_db:ppOrHAhrumItcDy9@simple-crud-mongodb-pra.v6jm7nb.mongodb.net/solo-app?appName=simple-crud-mongodb-practice";
const uriScic = "mongodb+srv://scic_nextJS_db:ppOrHAhrumItcDy9@simple-crud-mongodb-pra.v6jm7nb.mongodb.net/scic-app?appName=simple-crud-mongodb-practice";

const checkDatabases = async () => {
    try {
        console.log("Checking databases...\n");

        // Check solo-app
        const conn1 = await mongoose.createConnection(uriSolo).asPromise();
        const count1 = await conn1.collection('items').countDocuments();
        console.log(`[solo-app] Items found: ${count1}`);
        await conn1.close();

        // Check scic-app
        const conn2 = await mongoose.createConnection(uriScic).asPromise();
        const count2 = await conn2.collection('items').countDocuments();
        console.log(`[scic-app] Items found: ${count2}`);
        await conn2.close();

    } catch (err) {
        console.error('Error:', err.message);
    }
};

checkDatabases();
