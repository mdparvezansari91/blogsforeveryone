// src/lib/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false;

async function dbConnect() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    if (isConnected) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Reduce max pool size
            connectTimeoutMS: 30000,
        });

        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Add connection error handler
        conn.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        // Add disconnection handler
        conn.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        isConnected = false;
        throw error;
    }
}

export default dbConnect;

export async function disconnectDB() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    }
}