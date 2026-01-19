require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// CONFIGURATION
const corsOptions = {
    origin: '*', // Allow all origins for dev
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// DB CONNECTION
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB Connected to scic-app');
    })
    .catch((error) => {
        console.log('MongoDB Connection Failed', error);
    });

// --- SCHEMAS ---

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String }, // Matches frontend 'photoURL'
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Item Schema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, default: 'Generic' },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    features: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model('Item', itemSchema);

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('SCIC NextJS Server is running');
});

// --- USERS ---
// Create or Update User
app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        if (!user.email) return res.status(400).send({ message: 'Email is required' });

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
            const result = await User.updateOne(
                { email: user.email },
                {
                    $set: {
                        lastLogin: new Date(),
                        photoURL: user.photoURL || existingUser.photoURL
                    }
                }
            );
            return res.send({ message: 'User updated', result });
        }

        const newUser = new User(user);
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const result = await User.findOne({ email });
    res.send(result);
});

// Update User Profile
app.put('/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedData = req.body;

        const result = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    name: updatedData.name,
                    photoURL: updatedData.photoURL
                }
            },
            { new: true }
        );

        if (!result) return res.status(404).send({ message: 'User not found' });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// --- ITEMS ---
// Get All Items
app.get('/items', async (req, res) => {
    try {
        const result = await Item.find().sort({ createdAt: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Single Item
app.get('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const result = await Item.findById(id);
        if (!result) return res.status(404).send({ message: 'Item not found' });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Create Item
app.post('/items', async (req, res) => {
    try {
        const item = req.body;
        const newItem = new Item(item);
        const result = await newItem.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete Item (CRUD Requirement)
app.delete('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const result = await Item.findByIdAndDelete(id);
        if (!result) return res.status(404).send({ message: 'Item not found' });
        res.send({ message: 'Item deleted successfully', result });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update Item (CRUD Requirement)
app.put('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const result = await Item.findByIdAndUpdate(id, updatedData, { new: true });
        if (!result) return res.status(404).send({ message: 'Item not found' });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
