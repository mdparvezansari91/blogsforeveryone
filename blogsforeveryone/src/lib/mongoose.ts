// src/lib/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false; // Track connection status

async function dbConnect() {
    // Ensure the MONGODB_URI environment variable is defined
    if (!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    // Return early if already connected
    if (isConnected) {
        return;
    }

    try {
        // Connect to MongoDB with specified options
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Set maximum pool size
            connectTimeoutMS: 30000,
        });

        isConnected = true; // Update connection status
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Add connection error handler
        conn.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false; // Update connection status on error
        });

        // Add disconnection handler
        conn.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false; // Update connection status on disconnection
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        isConnected = false; // Reset connection status on error
        throw error; // Rethrow the error for further handling
    }
}

// Export the connection function
export default dbConnect;

// Function to disconnect from the database
export async function disconnectDB() {
    // Check if the connection is active
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect(); // Disconnect from MongoDB
        isConnected = false; // Reset connection status
        console.log('Disconnected from MongoDB');
    }
}