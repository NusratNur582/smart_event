const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema for the contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    contact: String,
    service: String
});

// Create a model for the contact form data
const Contact = mongoose.model('Contact', contactSchema);

// Handle form submissions
app.post('/api/contact', (req, res) => {
    const { name, contact, service } = req.body;

    const newContact = new Contact({
        name,
        contact,
        service
    });

    newContact.save()
        .then(() => res.status(200).json({ message: 'Form submitted successfully' }))
        .catch(err => res.status(500).json({ error: 'Error saving form data' }));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
