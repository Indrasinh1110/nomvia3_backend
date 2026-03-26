require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { initializeFirebase } = require('./src/config/firebase');

const PORT = process.env.PORT || 5000;

// Initialize Services
connectDB();
initializeFirebase();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // server.close(() => process.exit(1)); // Optional: close server on crash
});
