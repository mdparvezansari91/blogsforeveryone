// src/lib/cache.ts

// Define a generic type for the cache
type CacheValue = {
    data: unknown; // You can replace 'unknown' with a more specific type if needed
    expiresAt: number; // Timestamp for expiration
};

// Create a cache object to store the data
const cache: { [key: string]: CacheValue } = {};

// Function to get cached data
export function getCachedData<T>(key: string): T | null {
    const cachedValue = cache[key];
    if (cachedValue && Date.now() < cachedValue.expiresAt) {
        return cachedValue.data as T; // Return the cached data if not expired
    }
    return null; // Return null if no valid cache
}

// Function to set cached data
export function setCachedData<T>(key: string, data: T, ttl: number) {
    const expiresAt = Date.now() + ttl; // Calculate expiration time
    cache[key] = { data, expiresAt }; // Store data with expiration timestamp
}